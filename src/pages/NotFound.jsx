import styled from "styled-components";
import Header from "../components/layout/Header";
import GlobalButton from "../components/UI/GlobalButton";
import { useNavigate } from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";
import notFoundImg from "../assets/notFound.svg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundLayout>
      <GlobalStyles />
      <Header />
      <img className="notFound" src={notFoundImg} alt="notFound" />
      <h2>페이지를 찾을 수 없습니다</h2>
      <GlobalButton
        padding="15px 35px"
        background="#567FE8"
        _fontSize={16}
        text="되돌아가기"
        onClick={() => navigate("/", { replace: true })}
      />
    </NotFoundLayout>
  );
};

const NotFoundLayout = styled.div`
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
    margin: 30px 0px;
  }
`;

export default NotFound;
