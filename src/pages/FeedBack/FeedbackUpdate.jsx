import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../../styles/theme";
import styled from "styled-components";
import GlobalButton from "../../components/UI/GlobalButton";
import { GrRefresh } from "react-icons/gr";
import { updateFeedbackDetail as updateDetailApi } from "../../apis/feedbackApis.js";

const FeedbackUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { video, data } = state;

  const [noteInfo, setNoteInfo] = useState({
    noteText: data.note,
    noteCount: 0,
  });
  const [isPublic, setIsPublic] = useState(data.isPublic);

  const clickUpdateHandler = () => {
    const cardId = data.id;
    const updateData = {
      note: noteInfo.noteText,
      isPublic,
    };

    updateDetailApi(cardId, updateData).then((data) => {
      if (isPublic === true) {
        navigate(`/feedback/${cardId}`, { replace: true });
      } else {
        navigate("/mypage/history", { replace: true });
      }
    });
  };

  const clickCancleHandler = () => {
    if (isPublic === true) {
      navigate(`/feedback/${data.id}`, { replace: true });
    } else {
      navigate("/mypage/history", { replace: true });
    }
  };

  return (
    <FormLayout>
      <div className="video_layout">
        <video controls src={video}></video>
      </div>
      <div className="btnWrapper">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <GlobalButton
            onClick={clickCancleHandler}
            text="취소"
            margin="0px 10px 0px 0px"
            background={theme.colors.white}
            color={theme.colors.black}
            border="1px solid rgba(130, 130, 130, 0.2)"
          />
          <GlobalButton onClick={clickUpdateHandler} text="저장" />
        </div>
      </div>
      <div className="header">
        <span className="badge">{data.question.category}</span>
        <div className="title">
          <span>{`Q.${data.question.contents}`}</span>
          <span className="date">{data.createdAt}</span>
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
        <textarea
          onChange={(e) =>
            setNoteInfo({
              noteText: e.target.value,
              noteCount: e.target.value.length,
            })
          }
          placeholder="내용을 작성해주세요"
          maxLength={500}
          rows={5}
          value={noteInfo.noteText}
        ></textarea>
        <p
          style={{ textAlign: "end", color: "#666666" }}
        >{`${noteInfo.noteCount} / 500`}</p>
      </div>
    </FormLayout>
  );
};

const FormLayout = styled.div`
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
    background-color: ${({ theme }) => theme.colors.headerBgColor};
    border-radius: 6px;
    margin-bottom: 20px;
  }

  & .header {
    padding: 40px 0 20px 0px;
    border-bottom: 1px solid #e6e6e6;
  }

  & .badge {
    font-size: ${({ theme }) => theme.fontSize["12"]};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 15px;
    padding: 5px 12px;
  }

  & .header .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 18px;
    font-size: ${({ theme }) => theme.fontSize["20"]};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};

    & .date {
      margin-top: 12px;
      font-size: ${({ theme }) => theme.fontSize["14"]};
    }
  }
  & p {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.fontSize["12"]};
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
    margin: 8px 0px 20px 0px;
    font-size: ${({ theme }) => theme.fontSize["14"]};
  }

  & .radioGroup input {
    margin: 0px 5px 0px 0px;
  }

  & .radioGroup label {
    display: flex;
    align-items: center;
  }

  & .noti {
    font-size: ${({ theme }) => theme.fontSize["12"]};
    color: #666666;
    margin-left: 5px;
  }

  & .btnWrapper {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
  }
`;
export default FeedbackUpdate;
