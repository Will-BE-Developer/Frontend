import styled from "styled-components";
import GlobalButton from "../components/UI/GlobalButton";
import { useNavigate } from "react-router-dom";
import bigLogo from "../assets/bigLogo.png";

const NotAvailable = () => {
  const navigate = useNavigate();

  return (
    <NotAvailableLayout>
      <h2>로그인이 필요한 기능입니다</h2>
      <GlobalButton
        padding="15px 35px"
        background="#567FE8"
        _fontSize={16}
        text="로그인하기"
        onClick={() => navigate("/signin", { replace: true })}
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
  width: 100%;

  h2 {
    font-size: ${({ theme }) => theme.fontSize["20"]};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    margin-bottom: 30px;
  }
`;
export default NotAvailable;
