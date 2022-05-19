import React from "react";
import { useNavigate } from "react-router-dom";
import { boxShadow } from "../../styles/boxShadow";
import styled, { css } from "styled-components";
import theme from "../../styles/theme";
import GlobalButton from "../UI/GlobalButton";
import SocialSignin from "./SocialSignin";
import cancleIcon from "../../assets/icons/cancle.svg";
import { positions } from "@mui/system";

const SignupStart = (props) => {
  const currentPage = props.currentPage;
  const navigate = useNavigate();
  // 다음 페이지

  const nextPageHandler = () => {
    props.setCurrentPage(currentPage + 1);
  };

  const linkToSignUpHandler = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <BoxContainer>
        <div className="cancle">
          <button onClick={() => navigate("/")} className="goback">
            <img src={cancleIcon} alt="cancle" width="14px" />
          </button>
        </div>
        <h2 className="title">
          <div>
            여러 유저들과 공유하면서 준비하는 <span>Will be</span>
          </div>
        </h2>
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
        </div>
        <Terms>
          <span>아직 윌비 아이디가 없으신가요?</span>
          <TermsShow onClick={linkToSignUpHandler}>회원가입</TermsShow>
        </Terms>
      </BoxContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 158px auto;
`;

const BoxContainer = styled.div`
  ${({ theme }) => {
    const { fontSize, fontWeight, colors, device } = theme;

    return css`
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      width: 672px;
      height: 322px;
      .cancle {
        position: absolute;
        right: 20px;
        top: 20px;
      }

      .title {
        text-align: center;
        font-size: ${fontSize["24"]};
        font-weight: ${fontWeight.semiExtraBold};
        color: ${colors.grey90};
        span {
          color: ${colors.main};
        }
        div {
          margin: 24px 0 32px 0;
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
          padding: 0;
          font-size: ${fontSize["16"]};
        }
        .cancle {
          text-align: right;
          margin-right: 0px;
          img {
            width: 10px;
          }
        }
      }
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
        padding: 0 25px;
        width: 100%;
        height: 300px;
        & .sign_btn {
          width: 100%;
          margin: 0 auto;
          text-align: center;
        }
      }
    `;
  }}
`;

const Terms = styled.div`
  ${({ theme }) => {
    const { fontSize, fontWeight, colors, device } = theme;

    return css`
      display: flex;
      justify-content: center;
      font-size: ${fontSize["14"]};
      font-weight: ${fontWeight.semiExtraBold};
      margin-top: 10px;
      color: ${colors.grey70};
      ${device.mobile} {
        font-size: ${fontSize["12"]};
      }
    `;
  }}
`;

const TermsShow = styled.span`
  ${({ theme }) => {
    const { colors, fontWeight } = theme;
    return css`
      margin-left: 5px;
      text-decoration: underline;
      color: ${colors.grey80};
      font-weight: ${fontWeight.semiExtraBold};
      cursor: pointer;
    `;
  }}
`;

export default SignupStart;
