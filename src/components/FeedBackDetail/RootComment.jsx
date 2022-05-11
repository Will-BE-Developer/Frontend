import { useState } from "react";
import styled, { css } from "styled-components";
import { FaTrash } from "react-icons/fa";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";

const RootComment = ({ rootComment }) => {
  console.log(rootComment);
  const { id, user, createdAt, contents } = rootComment;
  const nestedComments = rootComment.nestedComments;
  console.log(nestedComments);
  const [isShowReply, setIsShowReply] = useState(false);

  const profileHandler = () => {
    alert("유저정보 보여주는 모달창 띄우기");
  };

  const replyToggleHandler = () => {
    setIsShowReply((isShowReply) => !isShowReply);
  };

  return (
    <CommentContainer>
      <AuthorContainer>
        <div className="author_box">
          <div className="user_profile" onClick={profileHandler}>
            <ProfileImg src={user?.profileImageUrl} />
            <span>{user?.nickname}</span>
          </div>
          <div className="icon_container">
            <span margin="0px">{createdAt}</span>
            <ScrapIcon />
          </div>
        </div>
      </AuthorContainer>

      <ContentBox>
        <span>{contents}</span>
      </ContentBox>

      <NestedContentsBox>
        <div onClick={replyToggleHandler} className="toggle_box">
          {isShowReply ? (
            <>
              <FiMinusSquare />
              <span>숨기기</span>
            </>
          ) : (
            <>
              <FiPlusSquare />
              <span>답글 달기</span>
            </>
          )}
        </div>
      </NestedContentsBox>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  border-bottom: 1px solid lightgrey;

  padding: 12px;
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

    & .icon_container {
      display: flex;
      -webkit-box-align: center;
      align-items: center;

      span {
        margin-left: 8px;
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

const NestedContentsBox = styled.div`
  ${({ theme }) => {
    return css`
      & .toggle_box {
        cursor: pointer;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        font-size: ${theme.calRem(14)};

        span {
          margin-left: 5px;
        }
      }
    `;
  }}
`;

export default RootComment;
