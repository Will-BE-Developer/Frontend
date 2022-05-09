import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import MyProfile from "../components/MyPage/MyProfile";

import GlobalCard from "../components/UI/GlobalCard";
const MyPage = () => {
  return (
    <Container>
      <Sidebar>
        <button>내 정보</button>
        <button>면접 기록</button>
        <button>내 정보</button>
        <button>내 정보</button>
      </Sidebar>
      <BodyContainer>
        <div className="title">
          <h1>스크랩</h1>
          <span>총 4개</span>
        </div>

        <MyProfile />
      </BodyContainer>
      <div></div>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  padding: 0;
  margin-top: 100px;
  display: flex;
`;

const Sidebar = styled.ul`
  width: 240px;
  height: 250px;
  display: flex;
  flex-direction: column;
  margin-right: 40px;

  button {
    width: 208px;
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
