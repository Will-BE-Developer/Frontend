import React from "react";
import { useNavigate } from "react-router-dom";
import { boxShadow } from "../../styles/boxShadow";
import styled, { css } from "styled-components";
import theme from "../../styles/theme";
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
      <h2 className="title">
        <span>Will be</span>
        <div>여러 유저들과 공유하면서 준비하는 화상 면접플랫폼</div>
      </h2>
      <BoxContainer>
        <div className="sign_btn">
          <SocialSignin />
          <GlobalButton
            onClick={nextPageHandler}
            _width="100%"
            margin="12px auto"
            background={theme.colors.grey10}
            color={theme.colors.grey70}
            hover={theme.colors.grey20}
          >
            이메일로 시작하기
          </GlobalButton>

          <GlobalButton
            onClick={goToSignUpHandler}
            margin="12px auto"
            _width="100%"
            background={theme.colors.grey10}
            color={theme.colors.grey70}
            hover={theme.colors.grey20}
          >
            회원가입 하기
          </GlobalButton>
          <button onClick={() => navigate("/")} className="goback">
            홈으로 가기
          </button>
        </div>
      </BoxContainer>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => {
    const { fontSize, fontWeight, colors, device } = theme;

    return css`
      margin: 158px auto;
      & > div {
        margin: 0 auto;
        text-align: center;
        margin-bottom: 20px;
      }

      .title {
        text-align: center;

        font-size: ${fontSize["24"]};
        font-weight: ${fontWeight.semiExtraBold};
        span {
          color: ${colors.main};
        }
        div {
          margin: 8px 0 32px 0;
        }
      }
      font-size: ${fontSize["24"]};
      font-weight: ${fontWeight.semiExtraBold};

      ${device.mobile} {
        margin-right: 0;
        width: 100%;
        .title {
          margin: 0 auto;
          text-align: center;
          margin-bottom: 32px;
          font-size: ${fontSize["16"]};
        }
      }
    `;
  }}
`;

const BoxContainer = styled.div`
  ${({ theme }) => {
    const { fontSize, fontWeight, colors, device } = theme;

    return css`
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
        .goback {
          color: ${colors.grey70};
          :hover {
            color: ${colors.main};
          }
        }
      }

      ${(props) => boxShadow()};

      ${device.mobile} {
        padding: 0 30px;
        width: 100%;
        height: 250px;
        & .sign_btn {
          width: 100%;
          margin: 0 auto;
          text-align: center;
        }
      }
    `;
  }}
`;

export default SignupStart;
