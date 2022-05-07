import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../apis/axios";

const InterviewForm = ({ thumbnail }, recorderRef) => {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState("");
  const [charCount, setCharCount] = useState(0);
  console.log(recorderRef, thumbnail);

  const s3UploadHandler = async () => {
    try {
      const res = await instance.get("/s3url-put", {
        params: {
          objKey: "testLlama",
        },
      });

      const s3VideoUrl = res.data;

      const res2 = await instance.put(
        s3VideoUrl,
        recorderRef.current.getBlob(),
        {
          headers: {
            "Content-Type": "video/webm",
          },
        }
      );

      // const s3ThumbnailUrl = res.data

      // const res3 = await instance.put(s3ThumbnailUrl, thumbnail, {
      //   headers: {
      //     "Content-Type": "image/png"
      //   }
      // })

      console.log(res2);

      recorderRef.current.reset();
      recorderRef.current = null;
    } catch (err) {
      console.log(err);
    }
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
            <span className="noti"> *피드백 게시판에 게시됩니다.</span>
          )}
        </label>
      </div>
      <div>
        <p>내용</p>
        <textarea
          onChange={(e) => setCharCount(e.target.value.length)}
          placeholder="내용을 작성해주세요"
          maxLength={500}
          rows={5}
        ></textarea>
        <p
          style={{ textAlign: "end", color: "#666666" }}
        >{`${charCount} / 500`}</p>
      </div>
      <div className="btnWrapper">
        <div>
          <button>재도전</button>
          <button>주제 수정</button>
        </div>
        <button>저장</button>
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
    margin: 8px 0px 20px 0px;
  }

  & .noti {
    font-size: ${({ theme }) => theme.fontSize["12"]};
    color: #666666;
  }

  & .btnWrapper {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
  }
`;

export default forwardRef(InterviewForm);
