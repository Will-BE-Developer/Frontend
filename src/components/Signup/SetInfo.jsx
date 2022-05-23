import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GlobalButton from "../UI/GlobalButton";

import styled, { css } from "styled-components";
import theme from "../../styles/theme";
import SetProfileImg from "./SetProfileImg";
import { boxShadow } from "../../styles/boxShadow";

import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import GlobalTextArea from "../UI/GlobalTextArea";
import { updateUser } from "../../store/slices/userSlice";
import mailCheckIcon from "../../assets/icons/mail_check.svg";

const SetInfo = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const nextPageHandler = () => {
    const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

    if (!nameRegex.test(userData.nickname)) {
      props.setCurrentPage(3);
      return alert("닉네임은 공백 없이 한글/영문/숫자만 가능합니다.");
    }
    props.setCurrentPage(currentPage + 1);
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

      const res = await dispatch(updateUser(formData)).unwrap();

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
          <BoxContainer>
            <InputField>
              <div className="contents_box">
                <img src={mailCheckIcon} alt="mail_check" />
                <h2 className="title">이메일 인증 완료!</h2>

                <span>이메일 인증 링크를 성공적으로 보냈습니다.</span>
                <span>메일 인증 버튼을 통해 회원가입을 완료해주세요.</span>
              </div>

              <GlobalButton
                onClick={linkToHomeHandler}
                type="submit"
                _width="100%"
                margin="24px 0 0 0"
                background={theme.colors.main}
                hover={theme.colors.mainHover}
              >
                홈으로 가기
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}
      {currentPage === 3 && (
        <Container>
          <BoxContainer>
            <div className="contents_box">
              <h2 className="title">닉네임</h2>
              <span>서비스 이용시 사용되는 닉네임입니다.</span>
            </div>
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
              <InfoMsg>공백 없이 한글/영문/숫자만 가능합니다. </InfoMsg>
              <GlobalButton
                onClick={nextPageHandler}
                type="submit"
                _width="100%"
                margin="24px 0 0 0"
                background={theme.colors.main}
                hover={theme.colors.mainHover}
              >
                다음 <NextIcon />
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}

      {currentPage === 4 && (
        <Container>
          <BoxContainer>
            <PreviousIcon onClick={previousPageHandler} />
            <div className="contents_box">
              <h2 className="title">프로필</h2>
              <span>서비스 이용시 사용되는 이미지입니다.</span>
            </div>
            <InputField isCenter="center">
              <FlexDiv>
                <SetProfileImg
                  getImage={getImageHandler}
                  image={getImage?.image}
                />
              </FlexDiv>
              <div>
                <InfoMsg>PNG, JPG, GiF 파일만 업로드 가능합니다.</InfoMsg>
              </div>
              <GlobalButton
                onClick={nextPageWithUploadImgHandler}
                type="submit"
                _width="100%"
                margin="24px 0 0 0"
                background={theme.colors.main}
                hover={theme.colors.mainHover}
              >
                다음 <NextIcon />
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}

      {currentPage === 5 && (
        <Container>
          <BoxContainer>
            <PreviousIcon onClick={previousPageHandler} />
            <div className="contents_box">
              <h2 className="title">포트폴리오 URL</h2>
              <span>
                깃허브, 노션 등 본인의 포트폴리오 URL을 한 개만 작성해주세요.
              </span>
            </div>
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
                type="submit"
                _width="100%"
                margin="16px 0 12px 0"
                background={theme.colors.main}
                hover={theme.colors.mainHover}
              >
                다음 <NextIcon />
              </GlobalButton>
            </InputField>
          </BoxContainer>
        </Container>
      )}
      {currentPage === 6 && (
        <Container>
          <BoxContainer>
            <InputField>
              <div className="contents_box">
                <img src={mailCheckIcon} alt="mail_check" />
                <h2 className="title">회원가입 성공!</h2>
                <span>Willbe 서비스를 이용해주셔서 감사합니다. </span>
              </div>

              <GlobalButton
                onClick={linkToHomeHandler}
                type="submit"
                _width="100%"
                margin="24px 0 0 0"
                background={theme.colors.main}
                hover={theme.colors.mainHover}
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
    const { colors, device, fontWeight, fontSize } = theme;
    return css`
      margin: 158px auto;
      & > div {
        margin: 0 auto;

        margin-bottom: 20px;
        text-align: center;
        & > h2 {
          color: ${colors.grey90};
          font-size: ${fontSize["24"]};
          margin-bottom: 8px;
        }

        & > span {
          font-size: ${fontSize["14"]};
          font-weight: ${fontWeight.regular};
          color: ${colors.mediumGrey};
          margin: 32px 0;
        }
      }

      font-weight: ${fontWeight.semiExtraBold};
      ${device.mobile} {
        margin-right: 0;
        width: 100%;
        font-size: ${fontSize["18"]};

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
  ${({ theme }) => {
    const { colors, device, fontSize, fontWeight } = theme;
    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      width: 672px;
      height: 500px;

      .contents_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: ${fontSize["24"]};
          color: ${colors.grey90};
          font-weight: ${fontWeight.semiExtraBold};
          margin: 16px 0 10px 0;
          ${device.mobile} {
            font-size: ${fontSize["20"]};
          }
        }

        span {
          font-size: ${fontSize["14"]};
          color: ${colors.grey70};
          margin-top: 5px;
          ${device.mobile} {
            font-size: ${fontSize["12"]};
          }
        }
      }
      ${boxShadow()};
      ${device.mobile} {
        width: 100%;
        height: 450px;
        padding: 10px 5%;
      }
    `;
  }}
`;

const InputField = styled.form`
  ${({ theme }) => {
    const { colors, device, fontSize } = theme;
    return css`
      width: 100%;
      padding: 0 7%;
      text-align: left;
      margin: 40px 0;
      & .h1_text {
        display: flex;
        justify-content: center;
        font-size: ${fontSize["18"]};
        text-align: center;
        margin: 0 0 30px 0;
        color: ${colors.grey90};

        ${device.mobile} {
          display: inline-block;
          font-size: ${fontSize["16"]};
          margin: 0;
          div {
            margin-bottom: 5px;
          }
        }
      }

      & > div {
        width: 100%;
        display: flex;
        justify-content: ${(props) =>
          props.isCenter ? props.isCenter : "left"};

        align-items: center;
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
const InfoMsg = styled.span`
  ${({ theme }) => {
    const { colors, device, fontSize, fontWeight } = theme;
    return css`
      margin-top: 2px;
      font-size: ${fontSize["12"]};
      text-align: center;
      color: ${colors.info};
      margin-bottom: 16px;
    `;
  }}
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
  font-size: 20px;
  cursor: pointer;
  & > polygon {
    fill: ${({ theme }) => theme.colors.mediumGrey};
  }

  ${({ theme }) => theme.device.mobile} {
    margin-bottom: 5px;
  }
`;

export default SetInfo;
