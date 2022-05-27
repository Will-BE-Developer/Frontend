import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";
import commentApis from "../../apis/commentApis";
import ReactGA from "react-ga";

import TimeAgo from "../FeedBack/TimeAgo";
import GlobalTextArea from "../UI/GlobalTextArea";
import GlobalModal from "../../components/UI/GlobalModal";
import UserProfileModal from "../UI/ModalSample/UserProfileModal";
import defaultUserImage from "../../assets/defaultUserImage.png";

import theme from "../../styles/theme";
import styled, { css } from "styled-components";
import { IoAlertCircle } from "react-icons/io5";
import deleteIcon from "../../assets/icons/delete_grey.svg";
import editIcon from "../../assets/icons/edit.svg";

const Comment = ({
  currentComment,
  cardId,
  setAllComments,
  setCommentCount,
}) => {
  const { id, user, createdAt, contents, isMine, parentId } = currentComment;

  const isRootComment = parentId === null;
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [updateContent, setUpdateContent] = useState(contents);
  const isUpdateTextareaDisabled = updateContent.length === 0;

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const sendProfileModalHandler = (boolean) => {
    setOpenProfileModal(boolean);
  };
  const clickCancelEditHandler = () => {
    setUpdateContent(contents);
    return setIsEdit(false);
  };

  const clickUpdateHandler = () => {
    return setIsEdit(true);
  };
  const clickUpdatePostHandler = async (event) => {
    event.preventDefault();
    if (isUpdateTextareaDisabled) {
      alert("수정할 내용을 작성해주세요.");
      return;
    }

    let updateData = {};
    if (isRootComment) {
      updateData = {
        contents: updateContent,
        rootId: cardId,
        rootName: "interview",
      };
    } else {
      updateData = {
        contents: updateContent,
        rootId: parentId,
        rootName: "comment",
      };
    }

    try {
      const { data } = await commentApis.updateComment(updateData, id);

      setIsEdit(false);
      setAllComments(data.comments);
      setCommentCount(data.totalComments);
      ReactGA.event({
        category: "Comments",
        action: "Update Comment",
      });
    } catch (err) {
      Sentry.captureException(`Edit comment  : ${err}`);
      navigate("/notFound");
    }
  };

  const clickDeleteHandler = async () => {
    try {
      const { data } = await commentApis.deleteComment(id);
      setAllComments(data.comments);
      setCommentCount(data.totalComments);
      ReactGA.event({
        category: "Comments",
        action: "Delete Comment",
      });
    } catch (err) {
      Sentry.captureException(`Delete comment  : ${err}`);
      navigate("/notFound");
    }
  };

  return (
    <CommentContainer>
      <GlobalModal
        title="삭제"
        confirmText="삭제"
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={() => clickDeleteHandler()}
        isConfirm
        isIcon
        icon={<AlertIcon />}
      >
        댓글을 삭제하시겠습니까?
      </GlobalModal>
      <UserProfileModal
        img={user?.profileImageUrl}
        nickname={user?.nickname}
        githubLink={user?.githubLink}
        introduce={user?.introduce}
        setOpenProfileModal={sendProfileModalHandler}
        openProfileModal={openProfileModal}
        isMine={isMine}
      />
      <AuthorContainer>
        <div className="author_box">
          <div
            className="user_profile"
            onClick={() => setOpenProfileModal(true)}
          >
            <ProfileImg
              src={
                user?.profileImageUrl === null
                  ? defaultUserImage
                  : user?.profileImageUrl
              }
            />
            <div className="name_date">
              <span>{user?.nickname}</span>
              <TimeAgo timestamp={createdAt} />
            </div>
          </div>
          {isMine && !isEdit && (
            <div className="button_box hide">
              <button onClick={clickUpdateHandler}>
                <img src={editIcon} alt="editIcon" />
              </button>
              <button onClick={() => setOpenDeleteModal(true)}>
                <img src={deleteIcon} alt="delteIcon" />
              </button>
            </div>
          )}
        </div>
      </AuthorContainer>
      {isEdit ? (
        <ContentBox>
          <GlobalTextArea
            value={updateContent}
            onChange={(e) => setUpdateContent(e.target.value)}
            charLimit="255"
            rows="5"
            cols="80"
            placeHolder="댓글을 수정해주세요."
            border="none"
            isBorderBot
            _height="80px"
            background={theme.colors.grey5}
          />
          <div className="cancel_box">
            <button onClick={clickCancelEditHandler}>취소</button>
            <button onClick={clickUpdatePostHandler}>저장</button>
          </div>
        </ContentBox>
      ) : (
        <ContentBox>
          <span className="contents">{contents}</span>
        </ContentBox>
      )}
    </CommentContainer>
  );
};

const AlertIcon = styled(IoAlertCircle)`
  font-size: 24px;
  color: #ec5959;
`;

const CommentContainer = styled.div`
  padding: 12px;
  ${({ theme }) => theme.device.mobile} {
    padding: 10px 0;
  }
`;

const ContentBox = styled.div`
  font-size: ${({ theme }) => theme.calRem(14)};
  line-height: 1.5;
  margin: 16px 0px;
  resize: none;
  overflow: auto;
  & textarea {
    margin-top: 8px;
    padding: 11px 16px;
    border-bottom: 1px solid #e6e9f1;
    border-radius: 4px;
    width: 100%;
  }
  & .edit_box {
    margin-top: 8px;
    padding: 11px 16px;
    border-bottom: 1px solid #e6e9f1;
    border-radius: 4px;
    width: 100%;
  }

  & .cancel_box {
    display: flex;
    justify-content: flex-end;

    button {
      font-size: ${({ theme }) => theme.fontSize["12"]};
      color: ${({ theme }) => theme.colors.grey80};
    }
  }

  & .contents {
    /* width: 100%; */
    overflow: auto;
    word-break: break-all;
    color: ${({ theme }) => theme.colors.grey90};
  }
`;

const AuthorContainer = styled.div`
  ${({ theme }) => {
    const { colors, fontSize, fontWeight } = theme;
    return css`
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
            font-size: ${fontSize["12"]};
          }
        }
        & .name_date {
          display: flex;
          flex-direction: column;
          gap: 5px;
          span:first-child {
            font-size: ${fontSize["14"]};
            font-weight: ${fontWeight.semiExtraBold};
            color: ${colors.grey90};
          }
          span:last-child {
            font-size: ${fontSize["12"]};
            color: ${colors.grey70};
          }
        }
        & .button_box {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          gap: 8px;

          button {
            font-size: ${fontSize["12"]};
            color: ${colors.grey80};
          }
        }
      }
    `;
  }}
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

export default Comment;
