import { useState } from "react";
import * as Sentry from "@sentry/react";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../../styles/theme";
import styled, { css } from "styled-components";
import GlobalButton from "../../components/UI/GlobalButton";
import feedbackApis from "../../apis/feedbackApis.js";

import GlobalTextArea from "../../components/UI/GlobalTextArea";

const FeedbackUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { video, data } = state;

  const [noteInfo, setNoteInfo] = useState({
    noteText: data.note,
    noteCount: 0,
  });
  const [isPublic, setIsPublic] = useState(data.isPublic);

  const clickUpdateHandler = async () => {
    const cardId = data.id;
    const updateData = {
      note: noteInfo.noteText,
      isPublic,
    };

    try {
      feedbackApis.updateDetail(cardId, updateData);
      navigate(`/feedback/${cardId}`, { replace: true });
    } catch (err) {
      Sentry.captureException(`Update Feedback  : ${err}`);
      navigate("/notFound");
    }
  };

  const clickCancleHandler = () => {
    navigate(`/feedback/${data.id}`, { replace: true });
  };

  return (
    <FormLayout>
      <div className="video_layout">
        <video controls src={video}></video>
      </div>
      <div className="btnWrapper">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <GlobalButton
            text="저장"
            margin="0px 10px 0px 0px"
            background={theme.colors.blue}
            border="1px solid rgba(130, 130, 130, 0.2)"
            _height="40px"
            onClick={clickUpdateHandler}
            hover={theme.colors.mainHover}
          />
          <GlobalButton
            text="X"
            background={theme.colors.white}
            color={theme.colors.black}
            border="1px solid rgba(130, 130, 130, 0.2)"
            _height="40px"
            onClick={clickCancleHandler}
          />
        </div>
      </div>
      <div className="header">
        <span className="badge">{data.question.category}</span>
        <div className="title">
          <span>{`Q.${data.question.contents}`}</span>
        </div>
      </div>
      <div className="radioCotainer">
        <p>공개 여부</p>
        <div className="radioGroup">
          <label>
            <input
              onChange={() => setIsPublic(false)}
              type="radio"
              name="isPublic"
              checked={isPublic === false && "checked"}
            />
            나만 보기
          </label>
          <label>
            <input
              onChange={() => setIsPublic(true)}
              type="radio"
              name="isPublic"
              checked={isPublic === true && "checked"}
            />
            전체 공개
            {isPublic && (
              <span className="noti">*피드백 게시판에 게시됩니다.</span>
            )}
          </label>
        </div>
      </div>
      <div>
        <p>내용</p>
        <GlobalTextArea
          value={noteInfo.noteText}
          onChange={(e) =>
            setNoteInfo({
              noteText: e.target.value,
              noteCount: e.target.value.length,
            })
          }
          charLimit="500"
          rows="5"
          cols="80"
          placeHolder="내용을 수정해주세요."
          border="none"
          isBorderBot
          _height="120px"
          background={theme.colors.grey5}
        />
      </div>
    </FormLayout>
  );
};

const FormLayout = styled.div`
  ${({ badge, theme, bgColor }) => {
    const { colors, device, fontSize, fontWeight } = theme;
    return css`
      width: 100%;
      max-width: 1200px;
      text-align: start;
      video {
        max-width: 750px;
        width: 100%;
      }

      & .video_layout {
        display: flex;
        justify-content: center;
        background-color: ${colors.headerBgColor};
        border-radius: 6px;
        margin-bottom: 40px;
      }

      & .header {
        margin-top: 24px;
        border-bottom: 1px solid #e6e6e6;
      }

      & .badge {
        font-size: ${fontSize["14"]};
        color: ${colors.main};
        font-weight: 600;
      }

      & .header .title {
        font-size: ${fontSize["22"]};
        font-weight: ${fontWeight.extraBold};
        margin: 16px 0 24px 0;
        padding: 2px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      }
      & p {
        margin-top: 24px;
        font-size: ${fontSize["12"]};
      }

      & textarea {
        margin-top: 8px;
        padding: 11px 16px;
        border: 1px solid rgba(130, 130, 130, 0.2);
        border-radius: 4px;
        width: 100%;
      }

      & .radioCotainer {
        margin: 20px 0;
      }

      & .radioGroup {
        display: flex;
        gap: 10px;
        margin: 12px 0px 20px 0px;
        font-size: ${fontSize["14"]};
      }

      & .radioGroup input {
        margin: 0px 5px 0px 0px;
      }

      & .radioGroup label {
        display: flex;
        align-items: center;
      }

      & .noti {
        font-size: ${fontSize["12"]};
        color: #666666;
        margin-left: 5px;
      }

      & .btnWrapper {
        display: flex;
        justify-content: flex-end;
        margin: 20px 0px;
      }
    `;
  }}
`;
export default FeedbackUpdate;
