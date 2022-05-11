import { useState, memo } from "react";
import styled, { css } from "styled-components";
import { FaTrash } from "react-icons/fa";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import TimeAgo from "../FeedBack/TimeAgo";
import GlobalTextArea from "../UI/GlobalTextArea";
import GlobalButton from "../UI/GlobalButton";

const NestedComment = ({ nestedComment }) => {
  const { id, user, createdAt, contents } = nestedComment;
  const [isShowReply, setIsShowReply] = useState(false);

  const profileHandler = () => {
    alert("유저정보 보여주는 모달창 띄우기");
  };

  return (
    <CommentContainer>
      <AuthorContainer>
        <div className="author_box">
          <div className="user_profile" onClick={profileHandler}>
            <ProfileImg src={user?.profileImageUrl} />
            <div className="name_date">
              <span>{user?.nickname}</span>
              <TimeAgo timestamp={createdAt} />
            </div>
          </div>
          <div className="button_box">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
      </AuthorContainer>

      <ContentBox>
        <span>{contents}</span>
      </ContentBox>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  border-bottom: 1px solid lightgrey;
  padding: 20px 12px;
`;

const ContentBox = styled.div`
  font-size: ${({ theme }) => theme.calRem(14)};
  line-height: 1.5;
  margin: 16px 0px;
`;

const AuthorContainer = styled.div`
  width: 100%;

  & .author_box {
    flex-grow: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .user_profile {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        transform: scale(1.02);
      }
      & > span {
        font-size: ${({ theme }) => theme.calRem(12)};
      }
    }
    & .name_date {
      display: flex;
      flex-direction: column;
      gap: 5px;
      span:first-child {
        font-size: ${({ theme }) => theme.calRem(14)};
        font-weight: ${({ theme }) => theme.fontWeight.semiExtraBold};
      }
      span:last-child {
        font-size: ${({ theme }) => theme.calRem(12)};
      }
    }
    & .button_box {
      display: flex;
      -webkit-box-align: center;
      align-items: center;

      button {
        font-size: ${({ theme }) => theme.calRem(12)};
      }
    }
  }
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const ScrapIcon = styled(FaTrash)`
  ${({ theme }) => {
    return css`
      margin-left: 10px;
      height: 100%;
      font-size: ${theme.calRem(14)};
      padding: 0;
      color: ${theme.colors.lightGrey};
      cursor: pointer;
    `;
  }}
`;

export default NestedComment;
