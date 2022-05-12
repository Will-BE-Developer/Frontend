import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { getCookie } from "../shared/cookies";
import NotAvailable from "./NotAvailable";
import GlobalStyles from "../styles/GlobalStyles";
import Header from "../components/layout/Header";

const Interview = () => {
  const token = getCookie("token");

  return (
    <>
      <GlobalStyles />
      <Header />
      <InterviewWrapper>
        {token ? <Outlet /> : <NotAvailable />}
      </InterviewWrapper>
    </>
  );
};

const InterviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default Interview;
