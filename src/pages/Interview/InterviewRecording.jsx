import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RecordRTC from "recordrtc";
import Countdown from "react-countdown";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import styled from "styled-components";
import { BsAlarm } from "react-icons/bs";
import GlobalButton from "../../components/UI/GlobalButton";
import InterviewForm from "../../components/Interview/InterviewForm";
import webcamNotice from "../../assets/webcamNotice.png";
import interviewApis from "../../apis/interviewApis";

const InterviewRecording = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const recorderRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [time, setTime] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [question, setQuestion] = useState({});
  const [firstTry, setIsFirstTry] = useState(true);

  const recordingHandler = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      console.log("1");

      recorderRef.current = new RecordRTC(stream, {
        type: "video",
        mimeType: "video/webm;codecs=vp8,opus",
      });

      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.srcObject = stream;

      recorderRef.current.startRecording();

      setIsFirstTry(false);
      setIsStart(true);
    } catch (err) {
      setIsDenied(true);
    }
  }, []);

  useEffect(() => {
    if (isEnd) {
      setTimeout(() => {
        const { videoWidth, videoHeight } = videoRef.current;
        thumbnailRef.current.width = videoWidth;
        thumbnailRef.current.height = videoHeight;

        const ctx = thumbnailRef.current.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
        thumbnailRef.current.toBlob((blob) => setThumbnail(blob));
      }, 1000);

      return;
    }

    if (firstTry) {
      interviewApis
        .getQuestion(state)
        .then((question) => {
          setQuestion(question);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const timer = setTimeout(() => {
      if (videoRef.current.srcObject === null) {
        recordingHandler();
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [recordingHandler, isEnd, state, firstTry]);

  const stopRecordingHandler = () => {
    recorderRef.current.stopRecording(() => {
      videoRef.current.srcObject = null;
      videoRef.current.muted = false;
      videoRef.current.volume = 1;

      const video = URL.createObjectURL(recorderRef.current.getBlob());
      videoRef.current.src = video;

      setIsEnd(true);
    });
  };

  const resetHandler = () => {
    videoRef.current.src = null;
    videoRef.current.srcObject = null;
    recorderRef.current.reset();
    recorderRef.current = null;

    setIsEnd(false);
    setIsStart(false);
  };

  return (
    <RecordWrapper isEnd={isEnd}>
      <div className="innerLayout">
        {isDenied ? (
          <div className="denied">
            <img
              style={{ width: "100%" }}
              src={webcamNotice}
              alt="deniedError"
            />
          </div>
        ) : (
          <>
            {!isEnd && (
              <div className="header">
                <span className="badge">{question.category}</span>
                <div className="title">
                  <span>{`Q. ${question.contents}`}</span>
                  {isStart && !isEnd && (
                    <span className="alarm">
                      <BsAlarm size="18px" />
                      <Timer active duration={300000}>
                        <Timecode
                          format="H:?mm:ss"
                          style={{ color: "black" }}
                        />
                      </Timer>
                      <span>/</span>
                      <Timer
                        style={{ display: "none" }}
                        active
                        onFinish={stopRecordingHandler}
                        duration={300000}
                        onTimeUpdate={({ time }) => setTime(time)}
                      />
                      <Timecode time={301000 - time} format="H:?mm:ss" />
                    </span>
                  )}
                </div>
              </div>
            )}
            <div
              style={{ width: "100%", position: "relative", textAlign: "end" }}
            >
              <div className="videoLayout">
                <video controls autoPlay ref={videoRef} />
              </div>
              {!isStart && (
                <h1 className="count">
                  <Countdown
                    date={Date.now() + 5000}
                    renderer={({ seconds }) => seconds}
                  />
                </h1>
              )}
            </div>
            <div className="formWrapper">
              {!isStart && (
                <GlobalButton onClick={() => navigate("/interview")}>
                  주제 재선택
                </GlobalButton>
              )}
              {isStart && !isEnd && (
                <GlobalButton onClick={stopRecordingHandler}>Stop</GlobalButton>
              )}
              {isEnd && (
                <InterviewForm
                  category={question.category}
                  question={question.contents}
                  reset={resetHandler}
                  questionId={question.id}
                  thumbnail={thumbnail}
                  ref={recorderRef}
                />
              )}
            </div>
            <canvas ref={thumbnailRef} />
          </>
        )}
      </div>
    </RecordWrapper>
  );
};

const RecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & .innerLayout {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .denied {
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }

  & .header {
    max-width: 1200px;
    width: 100%;
    margin: 20px 0px;
    ${({ theme }) => theme.device.tablet} {
      padding: 0px 1rem;
    }
  }

  & .badge {
    font-size: ${({ theme }) => theme.fontSize["14"]};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 15px;
    padding: 5px 12px;
  }

  & .header .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 12px;
    font-size: ${({ theme }) => theme.fontSize["20"]};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }

  & .alarm {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 7px;
    border-radius: 4px;
    /* border: 1px solid rgba(130, 130, 130, 0.2); */
    padding: 8px 0px 8px 10px;
    font-size: ${({ theme }) => theme.fontSize["16"]};
    color: #b3b3b3;
  }

  video::-webkit-media-controls-current-time-display {
    display: ${({ isEnd }) => (isEnd ? "" : "none")};
  }

  video {
    max-width: 750px;
    width: 100%;
  }

  .videoLayout {
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.headerBgColor};
    border-radius: 6px;
    width: 100%;
  }

  .formWrapper {
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  canvas {
    display: none;
  }

  & .count {
    color: white;
    font-size: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    margin: 0;
    transform: translate(-50%, -50%);
  }

  svg:hover {
    cursor: pointer;
  }
`;

export default InterviewRecording;
