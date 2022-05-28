import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/UI/Loader";
import styled from "styled-components";
import GlobalCard from "../../components/UI/GlobalCard";
import mypageApis from "../../apis/mypageApis.js";
import bangIcon from "../../assets/icons/bang.png";
import GlobalButton from "../../components/UI/GlobalButton";
import theme from "../../styles/theme";
import { HiChevronRight } from "react-icons/hi";
import * as Sentry from "@sentry/react";

const MyHistory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ feedback: [], pagination: {} });

  const fetchFeedback = useCallback(async () => {
    if (data?.pagination?.nextPage === null) {
      return;
    }

    const page = data?.pagination?.nextPage ? data.pagination.nextPage : 1;

    try {
      const { data } = await mypageApis.getUserCard(page);
      setData((prev) => {
        return {
          feedback: [...prev.feedback, ...data?.interviews],
          pagination: data.pagination,
        };
      });
    } catch (err) {
      Sentry.captureException(`get user card : ${err}`);
      navigate("/notFound");
    }
  }, [data.pagination.nextPage, navigate]);

  return (
    <Container>
      <div className="title">
        <h1>면접 기록</h1>
        <span>총 {data?.pagination?.totalCounts}개</span>
      </div>
      <InfiniteScroll
        loadMore={fetchFeedback}
        hasMore={data?.pagination?.nextPage !== null}
        loader={<Loader key={0} />}
        threshold={theme.device.mobile ? 180 : 0}
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
              면접 보러가기
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

  & .title {
    display: flex;
    margin: 0 10px 40px 10px;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: ${({ theme }) => theme.calRem(24)};
    }
  }

  & .dropDown_container {
    display: flex;
    justify-content: right;
    left: 0;
    width: 316px;
    margin-left: auto;
  }

  & .noData {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
    height: 40vh;
    animation: fadein 2s;
    -webkit-animation: fadein 2s;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  & .card_wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

    ${({ theme }) => theme.device.mobile} {
      grid-template-columns: repeat(1, 1fr);
      gap: 40px;
      padding: 0 20px;
    }
  }
`;
export default MyHistory;
