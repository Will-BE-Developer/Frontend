import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

import styled from "styled-components";
import commentApis from "../../apis/commentApis";

const Comments = ({ commentsUrl, currentUserId }) => {
  const [allComments, setAllComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  // 부모, 자식 댓글 분리 및 최신순 정렬
  const nestedComments = [];
  allComments
    .map((comment) => {
      nestedComments.push(comment.nestedComments);
    })
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const rootComments = allComments.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  console.log(rootComments);
  console.log(nestedComments);

  useEffect(() => {
    commentApis.testGetComments().then((data) => {
      setAllComments(data.comments);
    });
  }, []);

  const getReplies = (commentId) =>
    allComments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  return (
    <CommentsContainer>
      <div className="title">피드백 n개</div>
      <CommentForm submitLabel="Write" />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment key={rootComment.id} rootComment={rootComment} />
        ))}
      </div>
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
  & .title {
    font-size: 16px;
  }

  & .comments-container {
    margin-top: 40px;
  }
`;
export default Comments;
