import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { getCookie } from "../shared/cookies";
import NotAvailable from "./NotAvailable";
import GlobalStyles from "../styles/GlobalStyles";
import Header from "../components/layout/Header";
import { useLocation } from "react-router-dom";

const Interview = () => {
  const token = getCookie("token");
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <>
      <GlobalStyles />
      <Header />
      <InterviewWrapper pathname={pathname}>
        {token ? <Outlet /> : <NotAvailable />}
      </InterviewWrapper>
    </>
  );
};

const InterviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: ${({ pathname }) => (pathname === "/interview" ? "20px" : "")};
`;

export default Interview;
