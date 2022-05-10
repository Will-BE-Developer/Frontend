import styled from "styled-components";
import GlobalButton from "../components/UI/GlobalButton";
import { useNavigate } from "react-router-dom";

const NotAvailable = () => {
  const navigate = useNavigate();

  return (
    <NotAvailableLayout>
      <h2>로그인이 필요한 기능입니다</h2>
      <GlobalButton
        onClick={() => navigate("/signin")}
        text="로그인 하러가기"
      />
    </NotAvailableLayout>
  );
};

const NotAvailableLayout = styled.div`
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
export default NotAvailable;
