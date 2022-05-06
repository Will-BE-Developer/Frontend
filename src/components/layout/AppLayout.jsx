import styled from "styled-components";
import Header from "./Header";
import GlobalStyles from "../../styles/GlobalStyles";

const AppLayout = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;

  ${({ theme }) => theme.device.mobile} {
    padding: ${({ theme }) => theme.calRem(80)} 15px
      ${({ theme }) => theme.calRem(32)} 15px;
  }
`;

export default AppLayout;
