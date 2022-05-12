import { useState } from "react";
import styled, { css } from "styled-components";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import GlobalButton from "../UI/GlobalButton";

import Comment from "./Comment";
import commentApis from "../../apis/commentApis";

const RootComment = ({ rootComment, cardId, setAllComments, allComments }) => {
  const { id, user, createdAt, contents, isMine } = rootComment;
  const nestedComments = rootComment.nestedComments;
  const [isShowReply, setIsShowReply] = useState(false);
  const [content, setContent] = useState("");
  const isTextareaDisabled = content.length === 0;

  const profileHandler = () => {
    alert("유저정보 보여주는 모달창 띄우기");
  };

  const replyToggleHandler = () => {
    setIsShowReply((isShowReply) => !isShowReply);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isTextareaDisabled) {
      alert("내용을 작성해주세요.");
      return;
    }
    const data = { contents: content, rootId: id, rootName: "comment" };
    try {
      await commentApis.addComment(data);
      setContent("");
      try {
        const getDataResponse = await commentApis.getComments(cardId);
        setAllComments(getDataResponse.comments);
      } catch (err) {
        console.log("대댓글 불러오기 오류", err);
      }
    } catch (err) {
      console.log("대댓글 작성 오류", err);
    }
  };

  return (
    <CommentContainer>
      <Comment currentComment={rootComment} cardId={cardId} />
      <NestedContentsBox>
        <div>
          {!isShowReply ? (
            <div onClick={replyToggleHandler} className="toggle_box">
              <FiPlusSquare />
              <span>답글 달기</span>
            </div>
          ) : (
            <>
              <div onClick={replyToggleHandler} className="toggle_box">
                <FiMinusSquare />
                <span>숨기기</span>
              </div>
              <div className="nested_box">
                <div>
                  {nestedComments.map((nestedComment) => (
                    <>
                      <Comment
                        key={nestedComment?.id}
                        currentComment={nestedComment}
                        cardId={cardId}
                        setAllComments={setAllComments}
                      />
                      <Divider />
                    </>
                  ))}
                </div>

                <div className="nested_textarea_box">
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
                      <GlobalButton
                        _width="70px"
                        _height="15px"
                        hover
                        text="취소"
                      />
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
                </div>
              </div>
            </>
          )}
        </div>
      </NestedContentsBox>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  border-bottom: 1px solid lightgrey;

  padding: 30px 12px;
`;

const Divider = styled.div`
  border-bottom: 1px solid lightgrey;
  margin: 12px;
`;
const NestedContentsBox = styled.div`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      & .toggle_box {
        cursor: pointer;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        font-size: ${theme.calRem(14)};
        width: max-content;
        padding: 10px 12px 0 12px;
        span {
          margin-left: 5px;
        }
        ${device.mobile} {
        }
      }

      & .nested_box {
        padding: 20px 25px;
        ${device.mobile} {
          padding: 10px 20px;
        }
      }

      & .nested_box .nested_textarea_box .btn_box {
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
        right: 0;
        gap: 5px;
      }
    `;
  }}
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
    gap: 5px;
    button {
      font-size: ${({ theme }) => theme.calRem(12)};
    }
  }
`;
export default RootComment;
