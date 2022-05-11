import { useState, useEffect } from "react";
import RootComment from "./RootComment";

import styled from "styled-components";
import commentApis from "../../apis/commentApis";
import TimeAgo from "../FeedBack/TimeAgo";

import GlobalTextArea from "../UI/GlobalTextArea";
import GlobalButton from "../UI/GlobalButton";

const Comments = ({ cardId }) => {
  const [allComments, setAllComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [content, setContent] = useState("");
  const isTextareaDisabled = content.length === 0;
  // 부모, 자식 댓글 분리 및 최신순 정렬

  // const sortAllComments = allComments.sort(
  //   (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  // );

  useEffect(() => {
    commentApis.getComments(cardId).then((data) => {
      setAllComments(data.comments);
      // console.log(data.comments);
    });
  }, [cardId]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(content);
    if (isTextareaDisabled) {
      alert("내용을 작성해주세요.");
      return;
    }

    const data = { contents: content, rootId: cardId, rootName: "interview" };
    try {
      const addDataResponse = await commentApis.addComment(data);
      console.log(addDataResponse);
      setContent("");
      try {
        const getDataResponse = await commentApis.getComments(cardId);
        console.log(getDataResponse.comments);
        setAllComments(getDataResponse.comments);
      } catch (err) {
        console.log("댓글 불러오기 오류", err);
      }
    } catch (err) {
      console.log("댓글 작성 오류", err);
    }
  };

  // const onClickSubmitHandler = (event) => {
  //   event.preventDefault();
  // };

  return (
    <CommentsContainer>
      <div className="title">피드백 n개</div>
      <Form>
        <div className="textarea_box">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 작성해주세요"
            maxLength={500}
            rows={5}
            value={content}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmitHandler();
              }
            }}
          ></textarea>
        </div>
        <div className="button_box">
          {isTextareaDisabled ? (
            <GlobalButton
              _width="70px"
              _height="15px"
              text="작성"
              onClick={onSubmitHandler}
            />
          ) : (
            <GlobalButton
              _width="70px"
              _height="15px"
              hover
              text="작성"
              onClick={onSubmitHandler}
            />
          )}
        </div>
      </Form>
      <div className="comments-container">
        {allComments?.map((rootComment) => (
          <RootComment
            key={rootComment.id}
            rootComment={rootComment}
            cardId={cardId}
            allComments={allComments}
            setAllComments={setAllComments}
          />
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
  }
`;

const Form = styled.form`
  padding: 30px 0;
  & textarea {
    margin-top: 8px;
    padding: 11px 16px;
    border: 1px solid rgba(130, 130, 130, 0.2);
    border-radius: 4px;
    width: 100%;
  }
  & .textarea_box {
    padding-bottom: 10px;
  }
  & .button_box {
    display: flex;
    justify-content: flex-end;
    button {
      font-size: ${({ theme }) => theme.calRem(12)};
    }
  }
`;
export default Comments;
