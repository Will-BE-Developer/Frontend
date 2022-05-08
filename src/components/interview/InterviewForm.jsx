import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../apis/axios";
import theme from "../../styles/theme";
import GlobalButton from "../UI/GlobalButton";
import { GrRefresh } from "react-icons/gr";

const InterviewForm = ({ thumbnail, questionId, reset }, recorderRef) => {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState("");
  const [noteInfo, setNoteInfo] = useState({ noteCount: 0 });

  const s3UploadHandler = async () => {
    if (isPublic.length === 0 || noteInfo.noteCount === 0) {
      alert("공개 여부 또는 내용을 작성해주세요.");
      return;
    }

    try {
      const { data } = await instance.get("/api/interviews/draft");

      const video = recorderRef.current.getBlob();
      const interviewId = data.interview.id;
      const presignedUrlVideo = data.presignedUrl.video;
      const presignedUrlThumbnail = data.presignedUrl.thumbnail;

      console.log(thumbnail, video);

      const s3ResVideo = await instance.put(presignedUrlVideo, video, {
        headers: {
          "Content-Type": "video/webm",
        },
      });

      const s3ResThumbnail = await instance.put(
        presignedUrlThumbnail,
        thumbnail,
        {
          headers: {
            "Content-Type": "image/png",
          },
        }
      );

      const response = await instance.post(
        `api/interviews/${interviewId}`,
        {
          note: noteInfo.noteText,
          questionId,
          isPublic,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(s3ResVideo, s3ResThumbnail, response);

      recorderRef.current.reset();
      recorderRef.current = null;

      if (isPublic) {
        navigate("/feedback");
      } else {
        navigate("/mypage");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reTryHandler = () => {
    reset();
  };

  return (
    <FormLayout>
      <p>공개 여부</p>
      <div className="radioGroup">
        <label>
          <input
            onChange={() => setIsPublic(false)}
            type="radio"
            name="isPublic"
          />
          나만 보기
        </label>
        <label>
          <input
            onChange={() => setIsPublic(true)}
            type="radio"
            name="isPublic"
          />
          전체 공개
          {isPublic && (
            <span className="noti">*피드백 게시판에 게시됩니다.</span>
          )}
        </label>
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
        ></textarea>
        <p
          style={{ textAlign: "end", color: "#666666" }}
        >{`${noteInfo.noteCount} / 500`}</p>
      </div>
      <div className="btnWrapper">
        <div style={{ display: "flex" }}>
          <GlobalButton
            margin="0px 10px 0px 0px"
            background={theme.colors.white}
            color={theme.colors.black}
            border="1px solid rgba(130, 130, 130, 0.2)"
            onClick={reTryHandler}
          >
            <GrRefresh style={{ marginRight: "5px" }} />
            재도전
          </GlobalButton>
          <GlobalButton
            onClick={() => navigate("/interview")}
            background={theme.colors.white}
            color={theme.colors.black}
            border="1px solid rgba(130, 130, 130, 0.2)"
          >
            주제 수정
          </GlobalButton>
        </div>
        <GlobalButton onClick={s3UploadHandler}>저장</GlobalButton>
      </div>
    </FormLayout>
  );
};

const FormLayout = styled.div`
  width: 100%;

  text-align: start;

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

export default forwardRef(InterviewForm);
