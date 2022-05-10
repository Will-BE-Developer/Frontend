import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import GlobalCard from "../../components/UI/GlobalCard";
import { getUserCard as getUserCardApi } from "../../apis/feedbackApis.js";

import Dropdown from "../../components/UI/GlobalDropDown";

const MyHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUserCardApi().then((data) => {
      setData(data.interviews);
    });
  }, []);

  console.log(data);

  return (
    <Container>
      <div className="title">
        <h1>면접 기록</h1>
        <span>총 {data.length}개</span>
      </div>

      <div className="card_wrap">
        {data?.map((card) => {
          return <GlobalCard key={card.id} card={card} />;
        })}
      </div>
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
