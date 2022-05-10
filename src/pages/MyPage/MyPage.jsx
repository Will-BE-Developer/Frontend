import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Outlet } from "react-router-dom";
import GlobalCard from "../../components/UI/GlobalCard";

const MyPage = () => {
  const navigate = useNavigate();

  const myinfoHandler = () => {
    navigate("/mypage");
  };
  const historyHandler = () => {
    navigate("/mypage/history");
  };
  const scrapHandeler = () => {
    navigate("/mypage/scrap");
  };

  return (
    <Container>
      <Sidebar>
        <button onClick={myinfoHandler}>내 정보</button>
        <button onClick={historyHandler}>면접 기록</button>
        <button onClick={scrapHandeler}>내 스크랩</button>
      </Sidebar>
      <Outlet />
    </Container>
  );
};
const Container = styled.div`
  max-width: 1200px;
  padding: 0;
  margin-top: 100px;
  display: flex;

  ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 240px;
  height: 250px;

  margin-right: 40px;

  button {
    width: 200px;
    height: 56px;
    padding: 18px 10px;
    background: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 12px;
    font-size: ${({ theme }) => theme.calRem(14)};
    text-align: left;

    &:hover {
      background: ${({ theme }) => theme.colors.lightGrey};
    }
    ${({ theme }) => theme.device.mobile} {
      width: 100px;
      height: 30px;
    }
  }

  ${({ theme }) => theme.device.mobile} {
    display: flex;

    width: 100%;
    height: auto;
  }
`;

const BodyContainer = styled.div`
  width: 100%;
  & .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: ${({ theme }) => theme.calRem(24)};
    }
  }
`;

export default MyPage;
