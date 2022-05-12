import styled, { css } from "styled-components";
import GlobalButton from "../../components/UI/GlobalButton";
import theme from "../../styles/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import mypageApis from "../../apis/mypageApis";
import defaultUserImage from "../../assets/defaultUserImage.jpg";
import { signout, deleteUser } from "../../store/slices/userSlice";
import SetProfileImg from "../../components/Signup/SetProfileImg";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [getImage, setGetImage] = useState(null);
  const [isComplited, setIsComplited] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await mypageApis.getUser();
      const userData = {
        profileImageUrl: data.user.profileImageUrl,
        nickname: data.user.nickname.replaceAll('"', ""),
        githubLink: data.user.nickname.replaceAll('"', ""),
        introduce: data.user.nickname.replaceAll('"', ""),
      };
      setUser(userData);
      setGetImage({ image: data.user.profileImageUrl });
    };

    if (isComplited) {
      fetchUser();
      return;
    }

    fetchUser();
  }, [isComplited]);

  const updateUser = async () => {
    try {
      const formData = new FormData();
      const img = getImage ? getImage.file : "";

      formData.append("profileImage", img);
      formData.append("nickname", JSON.stringify(user?.nickname));
      formData.append("githubLink", JSON.stringify(user?.githubLink));
      formData.append("introduce", JSON.stringify(user?.introduce));

      const res = await mypageApis.updateUser(formData);

      console.log(res);
      setIsEdit(false);
      setIsComplited(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getImageHandler = (data) => {
    setGetImage(data);
  };

  const editHandler = () => {
    setIsEdit(true);
    setIsComplited(false);
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
    const isConfirm = window.confirm("정말로 회원탈퇴를 하시겠습니까?");

    if (isConfirm) {
      try {
        const res = await dispatch(deleteUser()).unwrap();
        alert("회원탈퇴가 완료되었습니다");
        navigate("/", { replace: true });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  return (
    <Container>
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
                onClick={updateUser}
              />
              <GlobalButton
                text="X"
                background={theme.colors.white}
                color={theme.colors.black}
                border="1px solid rgba(130, 130, 130, 0.2)"
                _height="40px"
                onClick={() => {
                  console.log(user?.profileImageUrl);
                  setGetImage({ image: user?.profileImageUrl });
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
                user?.profileImageUrl ? user.profileImageUrl : defaultUserImage
              }
            />
          )}
          <div className="infoBody">
            <p>닉네임</p>
            {isEdit ? (
              <textarea
                value={user ? user.nickname : ""}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, nickname: e.target.value }))
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
                value={user ? user.githubLink : ""}
                placeholder="Github URL을 넣어주세요"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, githubLink: e.target.value }))
                }
              />
            ) : (
              <div className="githubLink">
                <p>{user?.githubLink ? user?.githubLink : "URL이 없습니다"}</p>
              </div>
            )}
            <p>소개글</p>
            {isEdit ? (
              <textarea
                value={user ? user.introduce : ""}
                placeholder="소개글을 작성해주세요"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, introduce: e.target.value }))
                }
              />
            ) : (
              <div className="introduce">
                <p>
                  {user?.introduce ? user?.introduce : "자기소개가 없습니다"}
                </p>
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
            onClick={deleteUserHandler}
          >
            회원탈퇴
          </GlobalButton>
        </div>
      </BodyContainer>
    </Container>
  );
};
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
