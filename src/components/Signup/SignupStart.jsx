import React from "react";
import { boxShadow } from "../../styles/boxShadow";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import GlobalButton from "../UI/GlobalButton";

const SignupStart = (props) => {
  const currentPage = props.currentPage;

  // 다음 페이지
  const nextPageHandler = () => {
    props.setCurrentPage(currentPage + 1);
  };

  return (
    <Container>
      <div>WillBE</div>
      <h2>여러 유저들과 공유하면서 준비하는 화상 면접 공유 공간</h2>
      <BoxContainer>
        <div>
          <GlobalButton _width="100%" height="50px" margin="0 0 12px 0" hover>
            카카오톡으로 시작하기
          </GlobalButton>
          <GlobalButton
            onClick={nextPageHandler}
            _width="100%"
            margin="0 0 12px 0"
            hover
          >
            이메일로 시작하기
          </GlobalButton>
        </div>
        <Terms>
          <label>
            <input type="checkbox" />
            (필수) 서비스 이용 약관 동의
            <Link to="/">
              <TermsShow>보기</TermsShow>
            </Link>
          </label>
        </Terms>
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
  height: 252px;

  & > div {
    padding: 0 7%;
    display: flex;
    flex-direction: column;
  }

  ${(props) => boxShadow()};

  ${({ theme }) => theme.device.mobile} {
    padding: 0 5%;
    width: 100%;
    height: 150px;
  }
`;

const Terms = styled.div`
  font-size: ${({ theme }) => theme.calRem(14)};
  font-weight: ${({ theme }) => theme.fontWeight.semiExtraBold};
  display: table-cell;

  & > label > input[type="checkbox"] {
    margin-right: 5px;
    vertical-align: middle;
    position: relative;
    bottom: 1px;
  }

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.calRem(12)};
  }
`;

const TermsShow = styled.span`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeight.semiExtraBold};
`;
export default SignupStart;
