import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import SetProfileImg from "./SetProfileImg";
import { boxShadow } from "../../styles/boxShadow";
import instance from "../../apis/axios";
import GlobalButton from "../UI/GlobalButton";

import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

import GlobalTextarea from "../UI/GlobalTextArea";
const SetInfo = (props) => {
  // 받아온 src url
  const [imgUrl, setImgUrl] = useState("");
  const [getUrl, setGetUrl] = useState("");
  // const getImageRef = useRef(null);
  const navigate = useNavigate();

  const currentPage = props.currentPage;

  const getImgUrl = (url) => {
    setImgUrl(url);
  };

  // 다음 페이지
  const nextPageHandler = () => {
    props.setCurrentPage(currentPage + 1);
  };

  const previousPageHandler = () => {
    props.setCurrentPage(currentPage - 1);
  };

  const s3PutPresignedUrl = async () => {
    try {
      const res = await instance.get("/s3url-put", {
        params: {
          objKey: "kellyImg",
        },
      });

      return res.data;
    } catch (err) {
      console.log(err.response);
    }
  };

  // 프로필사진 보내기
  const nextPageWithUploadImgHandler = async () => {
    props.setCurrentPage(currentPage + 1);
    // 여기서 프로필 현재 프로필사진 s3에 업로드하기

    const s3Url = await s3PutPresignedUrl();
    // s3Url 넣어서 업로드하기.
    try {
      const res = await instance.put(s3Url, imgUrl);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    getImgFromS3();
  };

  // get presigned url받고 영상받는 핸들러
  //
  const getImgFromS3 = async () => {
    const res = await instance.get("/s3url-get", {
      params: {
        objKey: "kellyImg",
      },
    });

    const s3Url = res.data;

    const getRealImgAxios = await instance.get(s3Url);

    const realImgUrl = getRealImgAxios.data;

    setGetUrl(realImgUrl);
  };

  const linkToHomeHandler = () => {
    navigate("/");
  };

  const checkEmailHandler = () => {
    alert("이미 사용중인 이메일입니다.");
  };

  return (
    <div>
      {currentPage === 2 && (
        <Container>
          <div>
            <h2>닉네임</h2>
            <span>서비스 이용시 사용되는 닉네임입니다.</span>
          </div>

          <BoxContainer>
            <InputField>
              <Label htmlFor="nickname">닉네임</Label>
              <div>
                <Input type="text" placeholder="2-6자 이내로 입력해주세요." />

                <GlobalButton
                  onClick={checkEmailHandler}
                  hover
                  _width="30%"
                  margin="0 0 0 8px"
                >
                  중복확인
                </GlobalButton>
              </div>
              <ErrorMSG>공백 없이 한글/영문/숫자만 가능합니다. </ErrorMSG>

              <GlobalButton
                onClick={nextPageHandler}
                _width="100%"
                margin="18px 0 0 0"
                hover
              >
                다음 <NextIcon />
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}

      {currentPage === 3 && (
        <Container>
          <div>
            <h2>프로필</h2>
            <span>서비스 이용시 사용되는 이미지입니다.</span>
          </div>
          <BoxContainer>
            <InputField isCenter="center">
              <PreviousIcon onClick={previousPageHandler} />
              <FlexDiv>
                <SetProfileImg sendImgUrl={getImgUrl} getUrl={getUrl} />
              </FlexDiv>
              <div>
                <ErrorMSG>PNG, JPG파일만 업로드 가능합니다.</ErrorMSG>
              </div>
              <GlobalButton onClick={nextPageHandler} _width="100%" hover>
                다음 <NextIcon />
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}

      {currentPage === 4 && (
        <Container>
          <div>
            <h2>포트폴리오 URL</h2>
            <span>
              깃허브, 노션 등 본인의 포트폴리오 URL을 한 개만 작성해주세요.
            </span>
          </div>

          <BoxContainer>
            <InputField>
              <div>
                <PreviousIcon onClick={previousPageHandler} />
              </div>

              <Label htmlFor="github_url">포트폴리오 URL</Label>
              <Input type="text" placeholder="https://github.com/" />
              <Label htmlFor="pr">자기소개</Label>
              <GlobalTextarea
                charLimit="50"
                rows="5"
                cols="80"
                placeholder="50자이내로 나를 표현해주세요."
              />

              <GlobalButton
                onClick={linkToHomeHandler}
                _width="100%"
                margin="18px 0 0 0"
                hover
              >
                가입 완료
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}
    </div>
  );
};

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isColum ? "column" : null)};

  margin-bottom: 10px;
`;
const Container = styled.div`
  ${({ theme }) => {
    const { colors, device, calRem, fontWeight } = theme;
    return css`
      margin: 0 auto;
      & > div {
        margin: 0 auto;

        margin-bottom: 20px;
        text-align: center;
        & > h2 {
          font-size: ${calRem(24)};
        }

        & > span {
          font-size: ${calRem(14)};
          font-weight: ${fontWeight.regular};
          color: ${colors.lightGrey};
          margin: 32px 0;
        }
      }

      font-weight: ${fontWeight.semiExtraBold};
      ${device.mobile} {
        margin-right: 0;
        width: 100%;
        font-size: ${calRem(18)};
        & > h2 {
          margin: 0 auto;
          text-align: center;
          margin-bottom: 32px;
        }
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
  height: 400px;

  ${(props) => boxShadow()};
  ${({ theme }) => theme.device.mobile} {
    padding: 0 5%;
    width: 100%;
    height: 300px;
  }
`;

const InputField = styled.form`
  width: 100%;
  padding: 0 7%;

  text-align: left;

  & > div {
    width: 100%;
    display: flex;
    justify-content: ${(props) => (props.isCenter ? props.isCenter : "left")};

    align-items: center;
  }
`;

const Button = styled.button`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      border-radius: 4px;
      background: ${colors.darkGrey};
      color: ${colors.white};
      width: 96px;
      height: 60px;
      font-size: ${calRem(16)};
      margin: 0 0 6px 0;

      ${device.mobile} {
        width: 80px;
        height: 30px;
        font-size: ${calRem(12)};
      }
      &:hover {
        background: ${colors.mediumGrey};
      }
    `;
  }}
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.calRem(14)};
  color: ${({ theme }) => theme.colors.black};
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
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
  text-align: center;
  color: ${({ theme }) => theme.colors.mediumGrey};
  margin-bottom: 16px;
`;

const NextIcon = styled(FcNext)`
  margin-right: 5px;
  vertical-align: middle;
  position: relative;
  bottom: 1px;
  & > polygon {
    fill: ${({ theme }) => theme.colors.white};
  }
`;
const PreviousIcon = styled(FcPrevious)`
  margin-bottom: 5px;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  & > polygon {
    fill: ${({ theme }) => theme.colors.lightGrey};
  }
`;

const Img = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;
export default SetInfo;
