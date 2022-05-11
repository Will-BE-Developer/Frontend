import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { boxShadow } from "../styles/boxShadow";
import styled from "styled-components";

// 회원가입 유효성 검사 api : react hook form
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import GlobalButton from "../components/UI/GlobalButton";
import GlobalStyles from "../styles/GlobalStyles";

import SignupStart from "../components/signin/SigninStart";

import { signinEmail } from "../store/slices/userSlice";

const Signin = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 회원가입 유효성 검사
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("이메일 형식이 맞지 않습니다.")
      .required("이메일을 입력해주세요."),
    password: Yup.string().required("비밀번호를 입력해주세요."),
  });

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: yupResolver(schema),
  });

  // 회원가입 폼 제출
  const onSubmitHandler = async (userData) => {
    try {
      const res = await dispatch(signinEmail(userData)).unwrap();
      console.log(res);
      if (res.token) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err.message);
      if (err.message === "가입되지 않은 이메일 입니다.") {
        suggestSingUp(err);
      }

      // alert(err.message);

      if (err.message === "이메일 인증 후에 이용해주세요.") {
        alert(err.message);
      }
    }
  };

  // 회원가입 유도하는 모달창
  const suggestSingUp = (err) => {
    alert(err);
    // navigate("/signup", { replace: true });
  };

  return (
    <>
      <GlobalStyles />
      {currentPage === 0 ? (
        <SignupStart
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <Container>
          <div>이메일 로그인</div>
          <BoxContainer>
            <SignUpForm onSubmit={handleSubmit(onSubmitHandler)}>
              <Label htmlFor="email">이메일</Label>
              <Input
                type="email"
                placeholder="이메일을 입력해주세요."
                {...register("email")}
              />
              <ErrorMSG>{errors.email?.message}</ErrorMSG>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                {...register("password")}
              />
              <ErrorMSG>{errors.password?.message}</ErrorMSG>
              <div className="signin_btn">
                <GlobalButton type="submit" _width="100%" margin="0 0 12px 0">
                  로그인
                </GlobalButton>
              </div>
            </SignUpForm>
          </BoxContainer>
        </Container>
      )}
    </>
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
  height: 500px;

  & > div {
    padding: 0 7%;
    display: flex;
    flex-direction: column;
  }

  ${boxShadow()};

  ${({ theme }) => theme.device.mobile} {
    padding: 0 5%;
    width: 100%;
    height: 350px;
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

  & .signin_btn {
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    & .signup_btn {
      margin-top: 20px;
      font-size: ${({ theme }) => theme.calRem(14)};
    }
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

export default Signin;
