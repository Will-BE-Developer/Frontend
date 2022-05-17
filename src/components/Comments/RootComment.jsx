import { useState } from "react";
import styled, { css } from "styled-components";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import GlobalButton from "../UI/GlobalButton";
import { getCookie } from "../../shared/cookies";
import Comment from "./Comment";
import commentApis from "../../apis/commentApis";
import GlobalTextArea from "../UI/GlobalTextArea";
import theme from "../../styles/theme";
const RootComment = ({
  rootComment,
  cardId,
  setAllComments,
  setCommentCount,
}) => {
  const token = getCookie("token");
  const { id } = rootComment;
  const nestedComments = rootComment.nestedComments;
  const [isShowReply, setIsShowReply] = useState(false);
  const [content, setContent] = useState("");
  const isTextareaDisabled = content.length === 0;

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
      const response = await commentApis.addComment(data);

      setContent("");
      setAllComments(response.comments);
      setCommentCount(response.totalComments);
    } catch (err) {
      console.log("대댓글 작성 오류", err);
    }
  };
  return (
    <CommentContainer>
      <Comment
        currentComment={rootComment}
        cardId={cardId}
        setAllComments={setAllComments}
        setCommentCount={setCommentCount}
      />

      <NestedContentsBox>
        <div>
          {!isShowReply ? (
            <div onClick={replyToggleHandler} className="toggle_box">
              <span>답글</span>
              <RiArrowDownSFill />
            </div>
          ) : (
            <>
              <div onClick={replyToggleHandler} className="toggle_box">
                <span>답글</span>
                <RiArrowUpSFill />
              </div>
              <div className="nested_box">
                <div>
                  {nestedComments.map((nestedComment) => {
                    return (
                      <div key={nestedComment.id}>
                        <Comment
                          currentComment={nestedComment}
                          cardId={cardId}
                          setAllComments={setAllComments}
                          setCommentCount={setCommentCount}
                        />
                        <Divider />
                      </div>
                    );
                  })}
                </div>
                {token && (
                  <div className="nested_textarea_box">
                    <Form>
                      <GlobalTextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        charLimit="255"
                        rows="5"
                        cols="80"
                        placeHolder="댓글을 작성해주세요."
                        _height="40px"
                        border="none"
                        isBorderBot
                      />

                      <div className="button_box">
                        {isTextareaDisabled ? (
                          <GlobalButton
                            text="작성"
                            onClick={onSubmitHandler}
                            _width="70px"
                            _height="35px"
                            hover
                            hoverBg="rgba(86, 127, 232, 0.06);"
                            background={theme.colors.white}
                            color={theme.colors.main}
                            border={`1px solid ${theme.colors.main}`}
                          />
                        ) : (
                          <GlobalButton
                            text="작성"
                            onClick={onSubmitHandler}
                            _width="70px"
                            _height="35px"
                            hover
                            hoverBg="rgba(86, 127, 232, 0.06);"
                            background={theme.colors.white}
                            color={theme.colors.main}
                            border={`1px solid ${theme.colors.main}`}
                          />
                        )}
                      </div>
                    </Form>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </NestedContentsBox>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  border-bottom: 1px solid #e6e9f1;

  padding: 30px 12px;
`;

const Divider = styled.div`
  border-bottom: 1px solid #e6e9f1;
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
        color: ${colors.grey80};
        width: max-content;
        padding: 5px 12px;
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
    border-bottom: 1px solid #e6e9f1;
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
