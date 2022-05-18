import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import GlobalCard from "../../components/UI/GlobalCard";
import GlobalButton from "../../components/UI/GlobalButton";
import Dropdown from "../../components/UI/GlobalDropDown";
import { feedbackApis } from "../../apis/feedbackApis.js";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/UI/Loader";
import theme from "../../styles/theme";
import { HiChevronRight } from "react-icons/hi";
import bangIcon from "../../assets/icons/bang.png";

const FeedBack = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ feedback: [], pagination: {} });
  const { state } = useLocation();
  const hotKeyword = state?.replace("#", "");

  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedCategory, setSelectedCategory] = useState(
    state ? hotKeyword : "전체보기"
  );

  const sortList = ["최신순", "오래된순", "스크랩순"];
  const categoryList = [
    "전체보기",
    "Algorithm",
    "Database",
    "General",
    "Java",
    "JavaScript",
    "Network",
    "OS",
    "Python",
    "React",
    "Spring",
    "UIUX",
    "Web",
  ];
  console.log(categoryList.sort());
  const onChangeHandler = () => {
    setData({ feedback: [], pagination: {} });
  };

  const fetchFeedback = useCallback(async () => {
    if (data?.pagination?.nextPage === null) {
      return;
    }

    const page = data?.pagination?.nextPage ? data.pagination.nextPage : 1;

    try {
      const response = await feedbackApis.getFeedback(
        page,
        selectedSort,
        selectedCategory
      );
      setData((prev) => {
        return {
          feedback: [...prev.feedback, ...response?.interviews],
          pagination: response.pagination,
        };
      });
    } catch (err) {
      console.log("피드백 불러오기 오류", err);
    }
  }, [selectedCategory, data, selectedSort]);

  console.log(data);
  return (
    <Container>
      <div className="dropDown_container">
        <Dropdown
          selected={selectedSort}
          setSelected={setSelectedSort}
          options={sortList}
          onChangeHandler={onChangeHandler}
        />
        <Dropdown
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          options={categoryList}
          onChangeHandler={onChangeHandler}
        />
      </div>

      <InfiniteScroll
        loadMore={fetchFeedback}
        hasMore={data?.pagination?.nextPage !== null}
        loader={<Loader key={0} />}
        threshold={100}
      >
        {data?.feedback.length === 0 ? (
          <div className="noData">
            <img alt="bang" src={bangIcon} />
            <p>데이터가 없습니다</p>
            <GlobalButton
              margin="10px 0px 0px 0px"
              hover={({ theme }) => theme.colors.grey5}
              background={theme.colors.white}
              color={theme.colors.black}
              border="1px solid rgba(130, 130, 130, 0.2)"
              onClick={() => navigate("/interview")}
            >
              면접 보러 가기
              <HiChevronRight size="22px" color={theme.colors.grey50} />
            </GlobalButton>
          </div>
        ) : (
          <div className="card_wrap">
            {data?.feedback?.map((card) => {
              return <GlobalCard key={card.id} card={card} />;
            })}
          </div>
        )}
      </InfiniteScroll>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0;
  margin-top: 100px;
  & .dropDown_container {
    display: flex;
    justify-content: right;
    left: 0;
    width: 316px;
    margin-left: auto;
    ${({ theme }) => theme.device.mobile} {
      width: 216px;
    }
  }

  & .card_wrap {
    display: grid;
    position: relative;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    animation: fadeInBottom 1s;
    transform: translateY(0%);

    @keyframes fadeInBottom {
      from {
        opacity: 0;
        transform: translateY(30%);
      }
      to {
        opacity: 1;
      }
    }
    ${({ theme }) => theme.device.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
    ${({ theme }) => theme.device.mobile} {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  & .noData {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
    height: 40vh;

    animation: fadein 1.5s;
    -webkit-animation: fadein 1.5s;

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

export default FeedBack;
