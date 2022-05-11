import { useState } from "react";
import styled, { css } from "styled-components";
import { FaTrash } from "react-icons/fa";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import TimeAgo from "../FeedBack/TimeAgo";

import GlobalTextArea from "../UI/GlobalTextArea";
import GlobalButton from "../UI/GlobalButton";
import NestedComment from "./NestedComment";

import commentApis from "../../apis/commentApis";

const RootComment = ({ rootComment, cardId, setAllComments, allComments }) => {
  const { id, user, createdAt, contents, isMine } = rootComment;
  const nestedComments = rootComment.nestedComments;
  const [isShowReply, setIsShowReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updateComment, setUpdateComment] = useState(contents);

  const [activeComment, setActiveComment] = useState(null);
  const [content, setContent] = useState("");
  const isTextareaDisabled = content.length === 0;
  const profileHandler = () => {
    alert("유저정보 보여주는 모달창 띄우기");
  };

  console.log(cardId);
  const replyToggleHandler = () => {
    setIsShowReply((isShowReply) => !isShowReply);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(content);

    const data = { contents: content, rootId: id, rootName: "comment" };
    try {
      const addDataResponse = await commentApis.addComment(data);
      console.log(addDataResponse);
      setContent("");
      try {
        const getDataResponse = await commentApis.getComments(cardId);
        console.log(getDataResponse.comments);
        setAllComments(getDataResponse.comments);
      } catch (err) {
        console.log("대댓글 불러오기 오류", err);
      }
    } catch (err) {
      console.log("대댓글 작성 오류", err);
    }
  };

  const clickUpdateHandler = () => {};
  const clickDeleteHandler = () => {};

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
            <button onClick={clickUpdateHandler}>수정</button>
            <button onClick={clickDeleteHandler}>삭제</button>
          </div>
        </div>
      </AuthorContainer>

      <ContentBox>
        <span>{contents}</span>
      </ContentBox>

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
                    <NestedComment
                      key={nestedComment.id}
                      nestedComment={nestedComment}
                    />
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
                      <GlobalButton
                        _width="70px"
                        _height="15px"
                        hover
                        text="작성"
                        onClick={onSubmitHandler}
                      />
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
