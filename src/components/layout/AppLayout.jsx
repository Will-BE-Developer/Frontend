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
  /* width: ${(props) => (props._width ? props._width : "max-content")}; */
  max-width: 1200px;
  margin: 0 auto;

  ${({ theme }) => theme.device.tablet} {
    padding: 0px 1rem;
  }
`;

export default AppLayout;
