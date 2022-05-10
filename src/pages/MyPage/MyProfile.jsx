import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import GlobalButton from "../../components/UI/GlobalButton";
import theme from "../../styles/theme";
const MyProfile = () => {
  return (
    <Container>
      <BodyContainer>
        <div className="title">
          <h1>내 정보</h1>
          <GlobalButton
            text="수정"
            margin="0px 10px 0px 0px"
            background={theme.colors.white}
            color={theme.colors.black}
            border="1px solid rgba(130, 130, 130, 0.2)"
            _height="40px"
            hover
          />
        </div>
      </BodyContainer>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
`;

const BodyContainer = styled.div`
  width: 100%;
  & .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: ${({ theme }) => theme.calRem(24)};
    }
  }
`;

export default MyProfile;
