import React from "react";
import styled from "styled-components";

const BodyLayOut = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;

  ${({ theme }) => theme.device.mobile} {
    padding: ${({ theme }) => theme.calRem(80)} 15px
      ${({ theme }) => theme.calRem(32)} 15px;
  }
`;

export default BodyLayOut;
