import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { boxShadow } from "../../styles/boxShadow";
import styled, { css } from "styled-components";
import theme from "../../styles/theme";
import LoadingLoader from "../UI/LoadingLoader";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import GlobalButton from "../UI/GlobalButton";
import { signupEmail } from "../../store/slices/userSlice";
import userApis from "../../apis/userApis";
import { FcPrevious } from "react-icons/fc";
import TermsModal from "../UI/ModalSample/TemsModal";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);

  const dispatch = useDispatch();

  // 회원가입 유효성 검사
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("이메일 형식이 맞지 않습니다.")
      .required("이메일을 입력해주세요."),
    password: Yup.string()
      .min(1, "비밀번호는 7~10자 사이로 입력해주세요.")
      .max(15, "비밀번호는 7~15자 사이로 입력해주세요.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/,
        "대문자와 소문자 특수문자를 조합해주세요."
      )
      .required(),
    passwordCheck: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
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
      password: "",
      passwordCheck: "",
    },
    resolver: yupResolver(schema),
  });

  const { ref, ...rest } = register("email");

  const onSubmitHandler = async (userData) => {
    const currentEmail = emailRef.current?.value;
    if (currentEmail !== emailValue) {
      alert("이메일 중복을 확인해주세요.");
      setCheckEmail(false);
      return;
    }
    if (!checkEmail) {
      alert("이메일 중복을 확인해주세요.");
      return;
    }
    if (!checkedTerms) {
      alert("윌비 서비스 이용 약관에 동의해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(signupEmail(userData)).unwrap();

      props.setCurrentPage(2);
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
      return props.setCurrentPage(1);
    }
  };

  const checkEmailHandler = async (e) => {
    e.preventDefault();
    const currentEmail = emailRef.current?.value;
    if (currentEmail) {
      try {
        const { data } = await userApis.signupEmailCheck(currentEmail);
        alert(data.msg);
        setCheckEmail(true);
        return;
      } catch (err) {
        alert(err.response.data.msg);
        setCheckEmail(false);
      }
    }
  };

  const previousPageHandler = () => {
    navigate("/signin");
  };

  const sendTermseModalHandler = (boolean) => {
    setOpenTermsModal(boolean);
  };

  const checkTermsHandler = () => {
    setCheckedTerms(!checkedTerms);
  };

  return (
    <Container>
      <TermsModal
        setOpenTermsModal={sendTermseModalHandler}
        openTermsModal={openTermsModal}
      />
      {isLoading ? (
        <LoadingLoader _height="70vh" text="이메일 인증 처리중입니다." />
      ) : (
        <>
          <BoxContainer>
            <SignUpForm onSubmit={handleSubmit(onSubmitHandler)}>
              <PreviousIcon onClick={previousPageHandler} />
              <div className="title">이메일 회원가입</div>
              <Label htmlFor="email">이메일</Label>
              <div>
                <Input
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  {...rest}
                  ref={(e) => {
                    ref(e);
                    emailRef.current = e;
                    setEmailValue(emailRef.current?.value);
                  }}
                />
                <button
                  type="text"
                  onClick={checkEmailHandler}
                  className="checkEmailBtn"
                >
                  중복확인
                </button>
              </div>
              <ErrorMSG>{errors.email?.message}</ErrorMSG>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                {...register("password")}
              />
              <ErrorMSG>{errors.password?.message}</ErrorMSG>

              <Label htmlFor="passwordCheck">비밀번호 확인</Label>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                {...register("passwordCheck")}
              />
              <ErrorMSG>{errors.passwordCheck?.message}</ErrorMSG>
              <GlobalButton
                type="submit"
                _width="100%"
                margin="0 0 12px 0"
                background={theme.colors.main}
                hover={theme.colors.mainHover}
              >
                인증하기
              </GlobalButton>
            </SignUpForm>

            <Terms>
              <label>
                <input
                  type="checkbox"
                  checked={checkedTerms}
                  onChange={checkTermsHandler}
                />
                (필수) 서비스 이용 약관 동의
                <button onClick={() => setOpenTermsModal(true)}>
                  <TermsShow>보기</TermsShow>
                </button>
              </label>
            </Terms>
          </BoxContainer>{" "}
        </>
      )}
    </Container>
  );
};

// const Container = styled.div`
//   ${({ theme }) => {
//     const { colors, device, fontSize, fontWeight } = theme;
//     return css`
//       margin: 158px auto;
//       .title {
//         text-align: center;
//         margin-bottom: 32px;
//         color: ${colors.grey90};
//         font-weight: ${fontWeight.semiExtraBold};
//       }
//       font-size: ${fontSize["24"]};
//       font-weight: ${fontWeight.semiExtraBold};

//       ${device.mobile} {
//         margin: 158px auto;
//         width: 100%;

//         font-size: ${fontSize["18"]};
//       }
//     `;
//   }}
// `;
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
  height: 620px;
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
    height: 450px;
  }
`;

const SignUpForm = styled.form`
  ${({ theme }) => {
    const { colors, device, fontSize, fontWeight } = theme;
    return css`
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
        justify-content: space-between;
        align-items: center;
      }

      .checkEmailBtn {
        display: inline-block;
        padding: 20px 0px;
        font-size: ${fontSize["16"]};
        color: ${colors.main};
        font-weight: ${fontWeight.semiBold};
        border: 1px solid #3771d3;
        width: 100px;
        height: 60px;
        border-radius: 8px;
        margin-left: 10px;
        white-space: nowrap;
        :hover {
          background: rgba(86, 127, 232, 0.06);
        }
        ${device.mobile} {
          height: 40px;
          padding: 10px 0px;
          font-size: ${fontSize["14"]};
          font-weight: ${fontWeight.regular};
        }
      }
    `;
  }}
`;

const Label = styled.label`
  ${({ theme }) => {
    const { colors, fontSize } = theme;
    return css`
      font-size: ${fontSize["14"]};
      color: ${colors.grey80};
      text-align: left;
    `;
  }}
`;

const Input = styled.input`
  ${({ theme }) => {
    const { colors, device, fontSize } = theme;
    return css`
      width: 100%;
      height: 60px;
      padding: 0.3em 1em;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      margin: 5px 0;

      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.placeHolder};

      ::placeholder {
        font-size: ${fontSize["14"]};
        color: ${colors.grey70};
        font-weight: lighter;
      }

      ${device.mobile} {
        height: 40px;
        ::placeholder {
          color: ${({ theme }) => theme.colors.placeHolder};
          font-size: ${({ theme }) => theme.calRem(12)};
        }
      }
    `;
  }}
`;
const ErrorMSG = styled.span`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.fontSize["12"]};
  text-align: left;
  color: ${({ theme }) => theme.colors.errorMsg};
  margin-bottom: 16px;
`;

const Terms = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSize, fontWeight } = theme;
    return css`
      font-size: ${fontSize["12"]};
      font-weight: ${fontWeight.semiExtraBold};
      margin-top: 10px;
      text-align: center;

      & > label > input[type="checkbox"] {
        margin-right: 5px;
        vertical-align: middle;
        position: relative;
        bottom: 1px;
      }
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
    const { colors, device, fontSize } = theme;
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
export default SignupForm;
