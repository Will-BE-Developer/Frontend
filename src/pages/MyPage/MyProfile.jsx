import styled from "styled-components";
import GlobalButton from "../../components/UI/GlobalButton";
import theme from "../../styles/theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultUserImage from "../../assets/defaultUserImage.jpg";
import { signout, deleteUser, updateUser } from "../../store/slices/userSlice";
import SetProfileImg from "../../components/Signup/SetProfileImg";

import { IoAlertCircle } from "react-icons/io5";
import GlobalModal from "../../components/UI/GlobalModal";

const MyProfile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [getImage, setGetImage] = useState({ image: user.profileImageUrl });
  const [updateUserData, setUpdateUserData] = useState({
    nickname: user.nickname,
    githubLink: user.githubLink,
    introduce: user.introduce,
  });

  console.log(getImage);

  const [openModal, setOpenModal] = useState(false);

  const updateUserHandler = async () => {
    try {
      const formData = new FormData();
      const img = getImage ? getImage.file : "";

      formData.append("profileImage", img);
      formData.append("nickname", JSON.stringify(updateUserData.nickname));
      formData.append("githubLink", JSON.stringify(updateUserData.githubLink));
      formData.append("introduce", JSON.stringify(updateUserData.introduce));

      await dispatch(updateUser(formData)).unwrap();

      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getImageHandler = (data) => {
    setGetImage(data);
  };

  const editHandler = () => {
    setIsEdit(true);
  };

  const signoutHandler = async () => {
    try {
      await dispatch(signout()).unwrap();
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUserHandler = async () => {
    console.log("계정삭제함수");
    try {
      const res = await dispatch(deleteUser()).unwrap();
      alert("계정삭제가 완료되었습니다");
      navigate("/", { replace: true });
      console.log(res);
    } catch (err) {
      console.log(err);
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
                onClick={updateUserHandler}
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
              text="수정"
              margin="0px 10px 0px 0px"
              background={theme.colors.white}
              color={theme.colors.black}
              border="1px solid rgba(130, 130, 130, 0.2)"
              _height="40px"
              hover
              onClick={editHandler}
            />
          )}
        </div>
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
              <textarea
                value={updateUserData.introduce}
                placeholder="소개글을 작성해주세요"
                onChange={(e) =>
                  setUpdateUserData((prev) => ({
                    ...prev,
                    introduce: e.target.value,
                  }))
                }
              />
            ) : (
              <div className="introduce">
                <p>{user.introduce ? user.introduce : "자기소개가 없습니다"}</p>
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <GlobalButton
            margin="0px 10px 0px 0px"
            background={theme.colors.white}
            color={theme.colors.black}
            border="1px solid rgba(130, 130, 130, 0.2)"
            _height="40px"
            hover
            onClick={signoutHandler}
          >
            로그아웃
          </GlobalButton>
          <GlobalButton
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
  width: 100%;
  & .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
    height: 70vh;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  & .userImage {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin-bottom: 25px;
  }

  & .infoBody {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }

  & .nickname,
  & .githubLink,
  & .introduce {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 12px 18px;
  }

  & .introduce {
    min-height: 100px;
  }

  & textarea {
    padding: 10px 12px;
    border: 1px solid rgba(130, 130, 130, 0.2);
    border-radius: 4px;
    width: 100%;
  }

  & .footer {
    display: flex;
    justify-content: end;
    gap: 10px;
    margin-top: 15px;
  }
`;

export default MyProfile;
