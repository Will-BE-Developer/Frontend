import React from "react";
import CommentForm from "./CommentForm";
import styled from "styled-components";
import "./temp.css";

const Comment = ({
  data,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  console.log(data);
  return (
    <CommentContainer>
      <AuthorContainer>
        <div className="author_box">
          <div className="user_profile" onClick={profileHandler}>
            <ProfileImg src={user?.profileImageUrl} />
            <span>{user?.nickname}</span>
          </div>
        </div>
      </AuthorContainer>

      <Grid is_flex margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{insert_dt}</Text>
      </Grid>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;

  &. profile {
  }
`;

const AuthorContainer = styled.div`
  width: 100%;
  & .author_box {
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    flex-grow: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding: 12px 0;

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
  }
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

export default Comment;
