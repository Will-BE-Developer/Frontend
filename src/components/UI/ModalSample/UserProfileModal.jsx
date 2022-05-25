import { useNavigate } from "react-router-dom";
import GlobalModal from "../GlobalModal";
import styled from "styled-components";
import { IoLinkOutline, IoPerson } from "react-icons/io5";
import defaultUserImage from "../../../assets/defaultUserImage.png";

const UserProfileModal = (props) => {
  const {
    img,
    nickname,
    githubLink,
    introduce,
    openProfileModal,
    setOpenProfileModal,
    isMine,
  } = props;

  const navigate = useNavigate();
  const linkToMyPageHandler = () => {
    navigate(`/mypage`);
  };

  return (
    <GlobalModal
      title="프로필"
      confirmText="내 프로필로 가기"
      open={openProfileModal}
      onClose={() => setOpenProfileModal(false)}
      onConfirm={linkToMyPageHandler}
      isConfirm={isMine}
      _width="400"
      _height="300px"
      _mobileHeight="300px"
    >
      <AuthorContainer>
        <div className="user_profile" onClick={() => setOpenProfileModal(true)}>
          <ProfileImg src={img === null ? defaultUserImage : img} />
          <span>{nickname}</span>
        </div>
        <table className="table">
          <tbody>
            <tr className="table_tr">
              <td width="94" style={{ fontSize: "12px", color: "#6D727C" }}>
                <LinkIcon />
                Github link
              </td>
              <td style={{ paddingRight: "2px" }}>|</td>

              <td className="github_link">
                <a target="_blank" href={githubLink} rel="noreferrer">
                  {githubLink}
                </a>
              </td>
            </tr>
            <tr className="table_tr">
              <td width="94" style={{ fontSize: "12px", color: "#6D727C" }}>
                <PersonIcon />
                자기소개
              </td>
              <td style={{ paddingRight: "2px" }}>|</td>
              <td>{introduce}</td>
            </tr>
          </tbody>
        </table>
      </AuthorContainer>
    </GlobalModal>
  );
};

const AuthorContainer = styled.div`
  width: 100%;
  & .user_profile {
    cursor: pointer;
    display: flex;
    align-items: center;
    & > span {
      font-size: 16px;
      font-weight: 600;
    }
    padding-bottom: 24px;
  }

  & .table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
    font-size: ${({ theme }) => theme.calRem(14)};
    .github_link {
      :hover {
        color: ${({ theme }) => theme.colors.main};
      }
    }
  }
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 48px;
  height: 48px;
  margin-right: 5px;
`;

const LinkIcon = styled(IoLinkOutline)`
  cursor: pointer;
  font-size: ${({ theme }) => theme.calRem(12)};
  padding: 0;
  margin-right: 5px;
`;

const PersonIcon = styled(IoPerson)`
  cursor: pointer;
  font-size: ${({ theme }) => theme.calRem(12)};
  padding: 0;
  margin-right: 5px;
`;
export default UserProfileModal;
