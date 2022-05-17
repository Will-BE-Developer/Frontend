import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalCard from "../../components/UI/GlobalCard";
import mypageApis from "../../apis/mypageApis.js";
import bangIcon from "../../assets/icons/bang.png";
import GlobalButton from "../../components/UI/GlobalButton";
import theme from "../../styles/theme";
import { HiChevronRight } from "react-icons/hi";

const MyScrap = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    mypageApis.getUserScrap().then((data) => {
      setData(data.interviews);
    });
  }, []);

  return (
    <Container>
      <div className="title">
        <h1>내 스크랩</h1>
        <span>총 {data?.length}개</span>
      </div>

      {data.length === 0 ? (
        <div className="noData">
          <img alt="bang" src={bangIcon} />
          <p>데이터가 없습니다</p>
          <GlobalButton
            margin="10px 0px 0px 0px"
            hover={({ theme }) => theme.colors.grey5}
            background={theme.colors.white}
            color={theme.colors.black}
            border="1px solid rgba(130, 130, 130, 0.2)"
            onClick={() => navigate("/feedback")}
          >
            피드백 보러가기
            <HiChevronRight size="22px" color={theme.colors.grey50} />
          </GlobalButton>
        </div>
      ) : (
        <div className="card_wrap">
          {data?.map((card) => {
            return <GlobalCard key={card.id} card={card} />;
          })}
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0;

  & .title {
    display: flex;
    margin: 0 10px 28px 10px;
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
    height: 60vh;
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

export default MyScrap;
