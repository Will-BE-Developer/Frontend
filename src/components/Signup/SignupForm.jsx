import React from "react";

import { boxShadow } from "../../styles/boxShadow";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// 회원가입 유효성 검사 api : react hook form
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import GlobalButton from "../UI/GlobalButton";

const SignupForm = (props) => {
  const currentPage = props.currentPage;

  // 다음 페이지
  const nextPageHandler = () => {
    props.setCurrentPage(currentPage + 1);
  };

  // 회원가입 유효성 검사
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("이메일 형식이 맞지 않습니다.")
      .required("이메일을 입력해주세요."),
    pw: Yup.string()
      .min(1, "비밀번호는 7~10자 사이로 입력해주세요.")
      .max(15, "비밀번호는 7~15자 사이로 입력해주세요.")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/,
      //   "대문자와 소문자 특수문자를 조합해주세요."
      // )
      .required(),
    checkPw: Yup.string()
      .oneOf(
        [Yup.ref("pw"), null],
        "비밀번호가 일치하지 않습니다. 다시 입력해주세요."
      )
      .required("비밀번호 확인란을 채워주세요."),
  });

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    initialValues: {
      email: "",
      pw: "",
      checkPw: "",
    },
    resolver: yupResolver(schema),
  });

  // 회원가입 폼 제출
  const onSubmit = (data) => {
    console.log(data);
    props.setCurrentPage(2);
  };

  const checkEmailHandler = () => {
    alert("이미 사용중인 이메일입니다.");
  };
  return (
    <Container>
      <div>이메일 회원가입</div>
      <BoxContainer>
        <SignUpForm onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">이메일</Label>
          <div>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요."
              {...register("email")}
            />
            <GlobalButton
              onClick={checkEmailHandler}
              hover
              _width="30%"
              margin="0 0 0 8px"
            >
              중복확인
            </GlobalButton>
          </div>
          <ErrorMSG>{errors.email?.message}</ErrorMSG>
          <Label htmlFor="pw">비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("pw")}
          />
          <ErrorMSG>{errors.pw?.message}</ErrorMSG>

          <Label htmlFor="checkPw">비밀번호 확인</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("checkPw")}
          />
          <ErrorMSG>{errors.checkPw?.message}</ErrorMSG>
          <GlobalButton type="submit" _width="100%" margin="0 0 12px 0" hover>
            회원가입
          </GlobalButton>
        </SignUpForm>
      </BoxContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  & > div {
    text-align: center;
    margin-bottom: 32px;
  }
  font-size: ${({ theme }) => theme.calRem(24)};
  font-weight: ${({ theme }) => theme.fontWeight.semiExtraBold};

  ${({ theme }) => theme.device.mobile} {
    margin-right: 0;
    width: 100%;
    font-size: ${({ theme }) => theme.calRem(18)};
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 672px;
  height: 620px;

  & > div {
    padding: 0 7%;
    display: flex;
    flex-direction: column;
  }

  ${(props) => boxShadow()};

  ${({ theme }) => theme.device.mobile} {
    padding: 0 5%;
    width: 100%;
    height: 400px;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 0 7%;

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.calRem(14)};
  color: ${({ theme }) => theme.colors.black};
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  padding: 0.3em 1em;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  margin: 5px 0;

  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.placeHolder};

  ::placeholder {
    font-size: ${({ theme }) => theme.calRem(16)};
    font-weight: lighter;
    color: ${({ theme }) => theme.colors.placeHolder};
  }

  ${({ theme }) => theme.device.mobile} {
    height: 30px;
    ::placeholder {
      color: ${({ theme }) => theme.colors.placeHolder};
      font-size: ${({ theme }) => theme.calRem(12)};
    }
  }
`;
const ErrorMSG = styled.span`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.calRem(12)};
  text-align: left;
  color: ${({ theme }) => theme.colors.errorMsg};
  margin-bottom: 16px;
`;

export default SignupForm;
