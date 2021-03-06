import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalButton from "../components/UI/GlobalButton";
import theme from "../styles/theme";

const NotAvailable = (props) => {
  const navigate = useNavigate();
  const { text, btnText, path } = props;

  const navigateHandler = (path) => {
    navigate(path, { replace: true });
  };
  return (
    <NotAvailableLayout>
      <h2>{text ? text : "로그인이 필요한 기능입니다"}</h2>
      <GlobalButton
        padding="15px 35px"
        background={theme.colors.main}
        hover={theme.colors.mainHover}
        _fontSize={16}
        text={btnText ? btnText : "로그인하기"}
        onClick={() =>
          path
            ? navigateHandler(path, { replace: true })
            : navigateHandler("/signin", { replace: true })
        }
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
