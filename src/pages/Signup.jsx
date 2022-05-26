import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../shared/cookies";
import NotAvailable from "./NotAvailable";
import Header from "../components/layout/Header";

import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import SetInfo from "../components/Signup/SetInfo";
import SignupForm from "../components/Signup/SignupForm";

const Signup = () => {
  const token = getCookie("token");
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(state ? state : 1);
  const sendSetCurrentPage = () => {
    setCurrentPage();
  };
  return (
    <>
      <GlobalStyles />
      {token && currentPage === 1 ? (
        <>
          <Header />
          <NotAvailable
            text="이미 로그인을 하셨습니다."
            btnText="홈으로 가기"
            path="/"
          />
        </>
      ) : (
        <Wrap pathname={pathname}>
          {currentPage === 1 ? (
            <SignupForm
              currentPage={currentPage}
              setCurrentPage={sendSetCurrentPage}
            />
          ) : (
            <SetInfo
              currentPage={currentPage}
              setCurrentPage={sendSetCurrentPage}
            />
          )}
        </Wrap>
      )}
    </>
  );
};

const Wrap = styled.div`
  margin: 0 auto;
  padding: 0 40px;
  ${({ theme }) => theme.device.mobile} {
    margin: 0 auto;
    padding: 0 8px;
  }
`;

export default Signup;
