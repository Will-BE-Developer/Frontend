import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../shared/cookies";
import NotAvailable from "./NotAvailable";
import Header from "../components/layout/Header";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { boxShadow } from "../styles/boxShadow";
import styled, { css } from "styled-components";
import theme from "../styles/theme";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import GlobalButton from "../components/UI/GlobalButton";
import GlobalStyles from "../styles/GlobalStyles";
import { FcPrevious } from "react-icons/fc";

import SignupStart from "../components/Signin/SigninStart";
import { signinEmail } from "../store/slices/userSlice";

const Signin = () => {
  const token = getCookie("token");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("이메일 형식이 맞지 않습니다.")
      .required("이메일을 입력해주세요."),
    password: Yup.string().required("비밀번호를 입력해주세요."),
  });

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

  const onSubmitHandler = async (userData) => {
    try {
      const res = await dispatch(signinEmail(userData)).unwrap();
      if (res.token) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
      return;
    }
  };

  const previousPageHandler = () => {
    setCurrentPage(0);
  };

  const linkToSignUpHandler = () => {
    navigate("/signup");
  };
  return (
    <>
      {!token ? (
        <Wrap>
          <GlobalStyles />
          {currentPage === 0 ? (
            <SignupStart
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            <Container>
              <BoxContainer>
                <SignUpForm onSubmit={handleSubmit(onSubmitHandler)}>
                  <PreviousIcon onClick={previousPageHandler} />
                  <div className="title">이메일 로그인</div>
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

                  <GlobalButton
                    type="submit"
                    _width="100%"
                    margin="0 0 12px 0"
                    background={theme.colors.main}
                    hover={theme.colors.mainHover}
                  >
                    로그인
                  </GlobalButton>

                  <Terms>
                    <span>계정이 없으신가요?</span>
                    <TermsShow onClick={linkToSignUpHandler}>
                      회원가입
                    </TermsShow>
                  </Terms>
                </SignUpForm>
              </BoxContainer>
            </Container>
          )}
        </Wrap>
      ) : (
        <>
          <GlobalStyles />
          <Header />
          <NotAvailable
            text="이미 로그인을 하셨습니다."
            btnText="홈으로 가기"
            path="/"
          />
        </>
      )}
    </>
  );
};

const Wrap = styled.div`
  ${({ theme }) => theme.device.mobile} {
    padding: 0 5px;
  }
`;
const Container = styled.div`
  ${({ theme }) => {
    const { fontSize, fontWeight, device } = theme;

    return css`
      margin: 158px auto;
      & > div {
        text-align: center;
        margin-bottom: 32px;
      }
      font-size: ${fontSize["24"]};
      font-weight: ${fontWeight.semiExtraBold};

      ${device.mobile} {
        margin-right: 0;
        width: 100%;
        font-size: ${fontSize["18"]};
      }
    `;
  }}
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 672px;
  height: 500px;
  position: relative;
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
  .title {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 40px;
  }
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
  }

  & .signup_btn {
    margin-top: 20px;
    font-size: ${({ theme }) => theme.calRem(14)};
  }
`;
const Label = styled.label`
  ${({ theme }) => {
    const { colors, device, fontSize, fontWeight } = theme;
    return css`
      font-size: ${fontSize["14"]};
      color: ${colors.grey80};
      text-align: left;
    `;
  }}
`;

const Input = styled.input`
  ${({ theme }) => {
    const { colors, device, fontSize, fontWeight } = theme;
    return css`
      width: 100%;
      height: 60px;
      padding: 0.3em 1em;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      margin: 5px 0;

      background: ${colors.white};
      color: ${colors.placeHolder};

      ::placeholder {
        font-size: ${fontSize["14"]};
        color: ${colors.grey70};
        font-weight: lighter;
      }

      ${device.mobile} {
        height: 40px;
        ::placeholder {
          color: ${colors.placeHolder};
          font-size: ${fontSize["12"]};
        }
      }
    `;
  }}
`;
const ErrorMSG = styled.span`
  ${({ theme }) => {
    const { colors, fontSize } = theme;
    return css`
      margin-top: 2px;
      font-size: ${fontSize["12"]};
      text-align: left;
      color: ${colors.errorMsg};
      margin-bottom: 16px;
    `;
  }}
`;

const Terms = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSize, fontWeight } = theme;
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
  margin-left: 5px;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.grey80};
  font-weight: ${({ theme }) => theme.fontWeight.semiExtraBold};
  cursor: pointer;
`;

const PreviousIcon = styled(FcPrevious)`
  ${({ theme }) => {
    const { colors, device, fontSize, fontWeight } = theme;
    return css`
      position: absolute;
      top: 24px;
      left: 24px;
      font-size: ${fontSize["20"]};
      cursor: pointer;
      & > polygon {
        fill: ${colors.darkGrey};
      }
      ${device.mobile} {
        font-size: ${fontSize["10"]};
      }
    `;
  }}
`;
export default Signin;
