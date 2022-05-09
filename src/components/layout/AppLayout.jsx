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
`;

export default AppLayout;
