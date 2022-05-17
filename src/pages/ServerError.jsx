import styled from "styled-components";
import Header from "../components/layout/Header";
import GlobalStyles from "../styles/GlobalStyles";
import notFoundImg from "../assets/notFound.svg";

const ServerError = () => {
  return (
    <ErrorLayout>
      <GlobalStyles />
      <Header />
      <img className="notFound" src={notFoundImg} alt="notFound" />
      <h2>서버와 연결이 불안정합니다</h2>
      <h2>잠시후 접속해주세요</h2>
    </ErrorLayout>
  );
};

export default ServerError;

const ErrorLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  .notFound {
    max-width: 60%;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize["20"]};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    margin: 10px 0px;
  }
`;
