import { useState } from "react";
import styled, { css } from "styled-components";
import { FaTrash } from "react-icons/fa";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import TimeAgo from "../FeedBack/TimeAgo";
import NestedComment from "./NestedComment";
import GlobalTextArea from "../UI/GlobalTextArea";
import GlobalButton from "../UI/GlobalButton";
const RootComment = ({ rootComment }) => {
  const { id, user, createdAt, contents } = rootComment;
  const nestedComments = rootComment.nestedComments;
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
                  <GlobalTextArea
                    charLimit="50"
                    rows="5"
                    cols="80"
                    placeholder="댓글을 작성해주세요."
                  />
                  <div className="btn_box">
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
                    />
                  </div>
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

export default RootComment;
