import styled, { css } from "styled-components";
import GlobalButton from "../../components/UI/GlobalButton";
import theme from "../../styles/theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import ReactGA from "react-ga";
import defaultUserImage from "../../assets/defaultUserImage.png";
import { signout, deleteUser, updateUser } from "../../store/slices/userSlice";
import SetProfileImg from "../../components/Signup/SetProfileImg";

import GlobalModal from "../../components/UI/GlobalModal";
import { IoAlertCircle } from "react-icons/io5";
import editIcon from "../../assets/icons/edit.png";
import LoadingLoader from "../../components/UI/LoadingLoader";
import GlobalTextArea from "../../components/UI/GlobalTextArea";

const MyProfile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getImage, setGetImage] = useState({ image: user.profileImageUrl });
  const [updateUserData, setUpdateUserData] = useState({
    nickname: user.nickname,
    githubLink: user.githubLink,
    introduce: user.introduce,
  });

  const [openModal, setOpenModal] = useState(false);
  const [openSignOuteModal, setOpenSignOutModal] = useState(false);

  const updateUserHandler = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const img = getImage ? getImage.file : "";

      formData.append("profileImage", img);
      formData.append("nickname", JSON.stringify(updateUserData.nickname));
      formData.append("githubLink", JSON.stringify(updateUserData.githubLink));
      formData.append("introduce", JSON.stringify(updateUserData.introduce));

      await dispatch(updateUser(formData)).unwrap();

      setIsLoading(false);
      setIsEdit(false);
    } catch (err) {
      Sentry.captureException(`update user : ${err}`);
    }
  };

  const getImageHandler = (data) => {
    setGetImage(data);
  };

  const editHandler = () => {
    setIsEdit(true);
  };

  const signOutHandler = async () => {
    try {
      await dispatch(signout()).unwrap();
      navigate("/", { replace: true });
    } catch (err) {
      Sentry.captureException(`signout : ${err}`);
    }
  };

  const deleteUserHandler = async () => {
    try {
      await dispatch(deleteUser()).unwrap();
      alert("계정삭제가 완료되었습니다");
      navigate("/", { replace: true });
    } catch (err) {
      Sentry.captureException(`delete user : ${err}`);
    }
  };

  return (
    <Container>
      <GlobalModal
        title="계정삭제"
        confirmText="계정삭제"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={deleteUserHandler}
        isConfirm
        isIcon
        icon={<AlertIcon />}
      >
        계정을 삭제하시겠습니까?
      </GlobalModal>{" "}
      <GlobalModal
        title="로그아웃"
        confirmText="로그아웃"
        open={openSignOuteModal}
        onClose={() => setOpenSignOutModal(false)}
        onConfirm={signOutHandler}
        isConfirm
        isIcon
        icon={<AlertIcon />}
      >
        로그아웃 하시겠습니까?
      </GlobalModal>
      <BodyContainer>
        <div className="title">
          <h1>내 정보</h1>
          {isEdit ? (
            <div className="btnWrapper">
              <GlobalButton
                text="저장"
                margin="0px 10px 0px 0px"
                background={theme.colors.blue}
                border="1px solid rgba(130, 130, 130, 0.2)"
                _height="40px"
                onClick={() => {
                  updateUserHandler();
                  ReactGA.event({
                    category: "Mypage",
                    action: "Update Profile",
                  });
                }}
                hover={theme.colors.mainHover}
              />
              <GlobalButton
                text="X"
                background={theme.colors.white}
                color={theme.colors.black}
                border="1px solid rgba(130, 130, 130, 0.2)"
                _height="40px"
                onClick={() => {
                  setGetImage({ image: user.profileImageUrl });
                  setIsEdit(false);
                }}
              />
            </div>
          ) : (
            <GlobalButton
              margin="0px 10px 0px 0px"
              background={theme.colors.white}
              color={theme.colors.black}
              border="1px solid rgba(130, 130, 130, 0.2)"
              _height="40px"
              hover
              onClick={editHandler}
            >
              <img alt="edit" src={editIcon} style={{ marginRight: "10px" }} />{" "}
              수정
            </GlobalButton>
          )}
        </div>
        {isLoading ? (
          <LoadingLoader _height="20vh" text="내 정보를 업데이트 중입니다" />
        ) : (
          <div className="myInfo">
            {isEdit ? (
              <SetProfileImg
                getImage={getImageHandler}
                image={getImage?.image}
                isEdit={isEdit}
              />
            ) : (
              <img
                className="userImage"
                alt="userImage"
                src={
                  user.profileImageUrl ? user.profileImageUrl : defaultUserImage
                }
              />
            )}
            <div className="infoBody">
              <p>닉네임</p>
              {isEdit ? (
                <textarea
                  value={updateUserData.nickname}
                  onChange={(e) =>
                    setUpdateUserData((prev) => ({
                      ...prev,
                      nickname: e.target.value,
                    }))
                  }
                />
              ) : (
                <div className="nickname">
                  <p>{user?.nickname}</p>
                </div>
              )}

              <p>포트폴리오 URL</p>
              {isEdit ? (
                <textarea
                  value={updateUserData.githubLink}
                  placeholder="Github URL을 넣어주세요"
                  onChange={(e) =>
                    setUpdateUserData((prev) => ({
                      ...prev,
                      githubLink: e.target.value,
                    }))
                  }
                />
              ) : (
                <div className="githubLink">
                  <p>{user.githubLink ? user.githubLink : "URL이 없습니다"}</p>
                </div>
              )}
              <p>소개글</p>
              {isEdit ? (
                <GlobalTextArea
                  className="introduce_textarea"
                  value={updateUserData.introduce}
                  onChange={(e) =>
                    setUpdateUserData((prev) => ({
                      ...prev,
                      introduce: e.target.value,
                    }))
                  }
                  charLimit="50"
                  rows="5"
                  cols="80"
                  placeHolder="댓글을 수정해주세요."
                  border="none"
                  isBorderBot
                  _height="80px"
                  background={theme.colors.grey5}
                />
              ) : (
                <div className="introduce">
                  <p>
                    {user.introduce ? user.introduce : "자기소개가 없습니다"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="footer">
          <GlobalButton
            disabled={isEdit}
            margin="0px 10px 0px 0px"
            background={theme.colors.white}
            color={theme.colors.black}
            border="1px solid rgba(130, 130, 130, 0.2)"
            _height="40px"
            hover
            onClick={() => setOpenSignOutModal(true)}
          >
            로그아웃
          </GlobalButton>
          <GlobalButton
            disabled={isEdit}
            margin="0px 10px 0px 0px"
            background={theme.colors.white}
            color={theme.colors.black}
            border="1px solid rgba(130, 130, 130, 0.2)"
            _height="40px"
            hover
            onClick={() => setOpenModal(true)}
          >
            회원탈퇴
          </GlobalButton>
        </div>
      </BodyContainer>
    </Container>
  );
};

const AlertIcon = styled(IoAlertCircle)`
  font-size: 24px;
  color: #ec5959;
`;
const Container = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
`;

const BodyContainer = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSize } = theme;
    return css`
      width: 100%;
      & .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 10px 28px 10px;
        h1 {
          font-size: ${({ theme }) => theme.calRem(24)};
        }
      }

      & .btnWrapper {
        display: flex;
      }

      & .myInfo .btnWrapper {
        margin-bottom: 20px;
      }

      & .myInfo {
        padding: 30px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }

      & .userImage {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        margin-bottom: 25px;
      }

      & .infoBody {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        p {
          font-size: ${fontSize["12"]};
          color: ${colors.grey80};
        }
      }

      & .nickname,
      & .githubLink,
      & .introduce {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 12px 18px;
        font-size: ${fontSize["12"]};
        color: ${colors.grey90};
        background: ${colors.grey5};
        margin-bottom: 10px;
      }

      & .introduce {
        min-height: 100px;
      }

      & textarea {
        padding: 10px 12px;
        border: 1px solid rgba(130, 130, 130, 0.2);
        border-radius: 4px;
        width: 100%;
        color: ${colors.grey90};
        background: ${colors.grey5};
        margin-bottom: 10px;
      }
      .introduce_textarea {
        height: 150px;
      }

      & .footer {
        display: flex;
        justify-content: end;
        gap: 10px;
        margin-top: 15px;
      }
    `;
  }}
`;

export default MyProfile;
