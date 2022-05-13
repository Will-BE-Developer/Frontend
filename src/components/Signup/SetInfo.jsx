import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../apis/axios";
import { getCookie } from "../../shared/cookies";
import GlobalButton from "../UI/GlobalButton";

import styled, { css } from "styled-components";
import SetProfileImg from "./SetProfileImg";
import { boxShadow } from "../../styles/boxShadow";

import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import GlobalTextArea from "../UI/GlobalTextArea";

const SetInfo = (props) => {
  const navigate = useNavigate();
  const token = getCookie("token");
  const [getImage, setGetImage] = useState(null);
  const [userData, setUserData] = useState({
    nickname: "",
    githubLink: "https://github.com/",
    introduce: "",
  });

  const currentPage = props.currentPage;

  const getImageHandler = (data) => {
    setGetImage(data);
  };

  const previousPageHandler = () => {
    props.setCurrentPage(currentPage - 1);
  };

  const nextPageWithUploadImgHandler = async () => {
    props.setCurrentPage(currentPage + 1);
    try {
      const formData = new FormData();

      const img = getImage ? getImage.file : "";

      formData.append("profileImage", img);
      formData.append("nickname", JSON.stringify(userData.nickname));
      formData.append("githubLink", JSON.stringify(userData.githubLink));
      formData.append("introduce", JSON.stringify(userData.introduce));

      const res = await instance.put("/api/users/me", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const linkToHomeHandler = () => {
    navigate("/");
  };

  return (
    <div>
      {currentPage === 2 && (
        <Container>
          <div>
            <h2>회원가입 성공</h2>
            <span>회원가입에 성공했습니다 이메일 인증을 완료해주세요.</span>
          </div>

          <BoxContainer>
            <InputField>
              <h1 className="h1_text">
                회원가입에 성공했습니다 이메일 인증을 완료해주세요.
              </h1>
              <GlobalButton
                onClick={linkToHomeHandler}
                _width="100%"
                margin="18px 0 0 0"
                hover
              >
                홈으로 가기
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}
      {currentPage === 3 && (
        <Container>
          <div>
            <h2>닉네임</h2>
            <span>서비스 이용시 사용되는 닉네임입니다.</span>
          </div>

          <BoxContainer>
            <InputField>
              <Label htmlFor="nickname">닉네임</Label>
              <div>
                <Input
                  value={userData.nickname}
                  type="text"
                  placeholder="2-15자 이내로 입력해주세요."
                  minLength="2"
                  maxLength="15"
                  onChange={(e) => {
                    setUserData((prev) => {
                      return { ...prev, nickname: e.target.value };
                    });
                  }}
                />
              </div>
              <ErrorMSG>공백 없이 한글/영문/숫자만 가능합니다. </ErrorMSG>
              <GlobalButton
                onClick={nextPageWithUploadImgHandler}
                // onClick={() => alert("clicked")}
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

      {currentPage === 4 && (
        <Container>
          <div>
            <h2>프로필</h2>
            <span>서비스 이용시 사용되는 이미지입니다.</span>
          </div>
          <BoxContainer>
            <PreviousIcon onClick={previousPageHandler} />
            <InputField isCenter="center">
              <FlexDiv>
                <SetProfileImg
                  getImage={getImageHandler}
                  image={getImage?.image}
                />
              </FlexDiv>
              <div>
                <ErrorMSG>PNG, JPG파일만 업로드 가능합니다.</ErrorMSG>
              </div>
              <GlobalButton
                onClick={nextPageWithUploadImgHandler}
                _width="100%"
                hover
              >
                다음 <NextIcon />
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}

      {currentPage === 5 && (
        <Container>
          <div>
            <h2>포트폴리오 URL</h2>
            <span>
              깃허브, 노션 등 본인의 포트폴리오 URL을 한 개만 작성해주세요.
            </span>
          </div>

          <BoxContainer>
            <PreviousIcon onClick={previousPageHandler} />
            <InputField>
              <Label htmlFor="github_url">포트폴리오 URL</Label>
              <Input
                value={userData.githubLink}
                onChange={(e) => {
                  setUserData((prev) => {
                    return { ...prev, githubLink: e.target.value };
                  });
                }}
                type="text"
                placeholder="https://github.com/"
              />
              <Label htmlFor="pr">자기소개</Label>
              <GlobalTextArea
                value={userData.introduce}
                onChange={(e) => {
                  setUserData((prev) => {
                    return { ...prev, introduce: e.target.value };
                  });
                }}
                charLimit="50"
                rows="5"
                cols="80"
                placeholder="50자이내로 나를 표현해주세요."
              />

              <GlobalButton
                onClick={nextPageWithUploadImgHandler}
                _width="100%"
                hover
              >
                다음 <NextIcon />
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}
      {currentPage === 6 && (
        <Container>
          <div>
            <h2>회원가입 성공</h2>
          </div>
          <BoxContainer>
            <InputField>
              <h1 className="h1_text">회원가입 성공을 축하합니다</h1>
              <p style={{ textAlign: "center" }}>회원가입에 성공했습니다.</p>
              <GlobalButton
                onClick={linkToHomeHandler}
                _width="100%"
                margin="18px 0 0 0"
                hover
              >
                홈으로 가기
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
          color: ${colors.mediumGrey};
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 672px;
  height: 400px;
  ${boxShadow()};
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

  & .h1_text {
    font-size: 20px;
    text-align: center;
    margin: 10px 0;
  }
  & > div {
    width: 100%;
    display: flex;
    justify-content: ${(props) => (props.isCenter ? props.isCenter : "left")};

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
  bottom: 1px;
  & > polygon {
    fill: ${({ theme }) => theme.colors.white};
  }
`;
const PreviousIcon = styled(FcPrevious)`
  margin-bottom: 5px;
  vertical-align: middle;
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 25px;
  cursor: pointer;
  & > polygon {
    fill: ${({ theme }) => theme.colors.mediumGrey};
  }
`;

export default SetInfo;
