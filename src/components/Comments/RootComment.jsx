import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../shared/cookies";
import * as Sentry from "@sentry/react";
import ReactGA from "react-ga";
import Comment from "./Comment";
import commentApis from "../../apis/commentApis";

import GlobalButton from "../UI/GlobalButton";
import GlobalTextArea from "../UI/GlobalTextArea";

import theme from "../../styles/theme";
import styled, { css } from "styled-components";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

const RootComment = ({
  rootComment,
  cardId,
  setAllComments,
  setCommentCount,
}) => {
  const token = getCookie("token");
  const navigate = useNavigate();

  const [isShowReply, setIsShowReply] = useState(false);
  const [content, setContent] = useState("");
  const { id } = rootComment;
  const nestedComments = rootComment.nestedComments;
  const isTextareaDisabled = content.length === 0;

  const replyToggleHandler = () => {
    setIsShowReply((isShowReply) => !isShowReply);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isTextareaDisabled) {
      alert("내용을 채워주세요.");
      return;
    }
    ReactGA.event({
      category: "Comments",
      action: "Add Nested Comment",
    });
    const nestedCommnetData = {
      contents: content,
      rootId: id,
      rootName: "comment",
    };
    try {
      const { data } = await commentApis.addComment(nestedCommnetData);
      setContent("");
      setAllComments(data.comments);
      setCommentCount(data.totalComments);
    } catch (err) {
      Sentry.captureException(`Add nested comment  : ${err}`);
      navigate("/notFound");
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
              <span>
                {nestedComments.length > 0
                  ? `${nestedComments.length}개의 답글`
                  : "답글 달기"}
              </span>
              <RiArrowDownSFill />
            </div>
          ) : (
            <>
              <div onClick={replyToggleHandler} className="toggle_box">
                <span>숨기기</span>
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
                        placeHolder="답글을 작성해주세요."
                        border="none"
                        isBorderBot
                        _height="80px"
                        background={theme.colors.grey5}
                      />

                      <div className="button_box">
                        {isTextareaDisabled ? (
                          <GlobalButton
                            text="작성"
                            onClick={onSubmitHandler}
                            _width="70px"
                            _height="35px"
                            mWidth="50px"
                            mHeight="30px"
                            mPadding="8px"
                            hover="rgba(86, 127, 232, 0.06);"
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
                            mWidth="50px"
                            mHeight="30px"
                            mPadding="8px"
                            hover="rgba(86, 127, 232, 0.06);"
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
  ${({ theme }) => theme.device.mobile} {
    padding: 20px 0px;
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid #e6e9f1;
  margin: 12px;
  ${({ theme }) => theme.device.mobile} {
    margin: 8px 0px;
  }
`;
const NestedContentsBox = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSize } = theme;
    return css`
      & .toggle_box {
        cursor: pointer;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        font-size: ${fontSize["14"]};
        color: ${colors.grey80};
        width: max-content;
        padding: 5px 12px;
        span {
          margin-left: 5px;
        }
        ${device.mobile} {
          padding: 5px 0px;
        }
      }

      & .nested_box {
        padding: 20px 25px;
        ${device.mobile} {
          padding: 10px 4px;
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
  padding: 50px 0;
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
