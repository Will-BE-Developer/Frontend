import React from "react";
import { useNavigate } from "react-router-dom";
import { boxShadow } from "../../styles/boxShadow";
import styled from "styled-components";

import GlobalButton from "../UI/GlobalButton";
import SocialSignin from "./SocialSignin";

const SignupStart = (props) => {
  const currentPage = props.currentPage;
  const navigate = useNavigate();
  // 다음 페이지
  const goToSignUpHandler = () => {
    navigate("/signup");
  };

  const nextPageHandler = () => {
    props.setCurrentPage(currentPage + 1);
  };

  return (
    <Container>
      <div>WillBE</div>
      <h2>여러 유저들과 공유하면서 준비하는 화상 면접 </h2>
      <BoxContainer>
        <div className="sign_btn">
          <SocialSignin />
          <GlobalButton
            onClick={nextPageHandler}
            _width="100%"
            margin="12px auto"
          >
            이메일로 시작하기
          </GlobalButton>
          <GlobalButton
            onClick={goToSignUpHandler}
            margin="12px auto"
            _width="100%"
          >
            회원가입 하기
          </GlobalButton>
          <GlobalButton onClick={() => navigate("/")} _width="100%">
            홈으로 되돌아가기
          </GlobalButton>
        </div>
      </BoxContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  & > div {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 20px;
  }

  & > h2 {
    text-align: center;
    margin-bottom: 32px;
  }
  font-size: ${({ theme }) => theme.calRem(24)};
  font-weight: ${({ theme }) => theme.fontWeight.semiExtraBold};

  ${({ theme }) => theme.device.mobile} {
    margin-right: 0;
    width: 100%;
    font-size: ${({ theme }) => theme.calRem(18)};
    & > h2 {
      margin: 0 auto;
      text-align: center;
      margin-bottom: 32px;
    }
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 672px;
  height: 322px;

  & .sign_btn {
    width: 520px;
    margin: 0 auto;
    text-align: center;
  }

  ${(props) => boxShadow()};

  ${({ theme }) => theme.device.mobile} {
    padding: 0 5%;
    width: 100%;
    height: 200px;
    & .sign_btn {
      width: 300px;
      margin: 0 auto;
      text-align: center;
    }
  }
`;

export default SignupStart;
