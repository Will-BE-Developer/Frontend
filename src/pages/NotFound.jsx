import styled from "styled-components";
import Header from "../components/layout/Header";
import GlobalButton from "../components/UI/GlobalButton";
import { useNavigate } from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundLayout>
      <GlobalStyles />
      <Header />
      <h2>페이지를 찾을 수 없습니다</h2>
      <GlobalButton
        onClick={() => navigate("/", { replace: true })}
        text="되돌아가기"
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

  h2 {
    font-size: ${({ theme }) => theme.fontSize["40"]};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    margin-bottom: 30px;
  }
`;

export default NotFound;
