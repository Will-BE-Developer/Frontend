import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RecordRTC from "recordrtc";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import styled from "styled-components";
import { BsAlarm } from "react-icons/bs";
import { GrRefresh } from "react-icons/gr";
import GlobalButton from "../../components/UI/GlobalButton";
import InterviewForm from "../../components/Interview/InterviewForm";
import webcamNotice from "../../assets/webcamNotice.svg";
import interviewApis from "../../apis/interviewApis";
import Countdown from "react-countdown";
import LoadingLoader from "../../components/UI/LoadingLoader";
import theme from "../../styles/theme";
import Slider from "@mui/material/Slider";

const InterviewRecording = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const recorderRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [time, setTime] = useState(0);
  const [thumbnail, setThumbnail] = useState();
  const [question, setQuestion] = useState({});
  const [firstTry, setIsFirstTry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const currSecond = Math.floor(time / 1000);

  const loadingHandler = () => {
    setIsLoading(true);
  };

  const recordingHandler = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

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
    if (state?.selectTopic === state?.question) {
      alert("면접 주제를 선택하고 오세요");
      navigate("/interview");
      return;
    }

    if (isEnd) {
      const timer = setTimeout(() => {
        const { videoWidth, videoHeight } = videoRef.current;
        thumbnailRef.current.width = videoWidth;
        thumbnailRef.current.height = videoHeight;

        const ctx = thumbnailRef.current.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
        thumbnailRef.current.toBlob((blob) => setThumbnail(blob));
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }

    if (state?.question) {
      setQuestion(state.question);
      return;
    }

    if (firstTry && !state?.question) {
      interviewApis
        .getQuestion(state.selectTopic)
        .then((question) => {
          setQuestion(question);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [recordingHandler, isEnd, state, firstTry, navigate]);

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
    <RecordWrapper
      currSecond={currSecond}
      isstart={isStart.toString()}
      isEnd={isEnd}
    >
      {isLoading ? (
        <LoadingLoader
          text="영상을 업로드중 입니다."
          noti="최대 1분이 소요될 수 있습니다."
        />
      ) : (
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
                  <span
                    style={{ fontSize: "20px" }}
                  >{`Q. ${question.contents} `}</span>
                  <div className="title">
                    {isStart && !isEnd && (
                      <span className="alarm">
                        <BsAlarm
                          size="22px"
                          color={
                            currSecond <= 170
                              ? theme.colors.main
                              : theme.colors.errorMsg
                          }
                        />
                        <Timer active duration={180000}>
                          <Timecode
                            format="H:?mm:ss"
                            style={{
                              color:
                                currSecond <= 170
                                  ? theme.colors.main
                                  : theme.colors.errorMsg,
                            }}
                          />
                        </Timer>
                        <Slider
                          sx={{
                            color:
                              currSecond <= 170
                                ? theme.colors.main
                                : theme.colors.errorMsg,
                          }}
                          className="slide"
                          min={0}
                          max={180}
                          value={currSecond}
                        />
                        <Timer
                          style={{ display: "none" }}
                          active
                          onFinish={stopRecordingHandler}
                          duration={180000}
                          onTimeUpdate={({ time }) => setTime(time)}
                        />
                        <Timecode
                          sx={{ color: theme.colors.grey40 }}
                          time={181000 - time}
                          format="H:?mm:ss"
                        />
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div
                style={{
                  width: "100%",
                  position: "relative",
                  textAlign: "end",
                }}
              >
                <div className="videoLayout">
                  <video
                    controls={isEnd ? true : false}
                    autoPlay
                    ref={videoRef}
                  />
                </div>
                {!isStart && (
                  <h1 className="count">
                    <Countdown
                      date={Date.now() + 5000}
                      renderer={({ seconds }) => {
                        return (
                          <div>
                            <h1>{seconds}</h1>
                            <p>3분 제한시간이 있습니다</p>
                          </div>
                        );
                      }}
                      onComplete={() => {
                        if (videoRef.current.srcObject === null) {
                          recordingHandler();
                        }
                      }}
                    />
                  </h1>
                )}
              </div>
              <div className="formWrapper">
                {!isStart && (
                  <GlobalButton
                    hover={({ theme }) => theme.colors.grey5}
                    margin="0px 10px 0px 0px"
                    background={theme.colors.white}
                    color={theme.colors.black}
                    border="1px solid rgba(130, 130, 130, 0.2)"
                    onClick={() => navigate("/interview")}
                  >
                    <GrRefresh style={{ marginRight: "5px" }} />
                    주제 재선택
                  </GlobalButton>
                )}
                {isStart && !isEnd && (
                  <>
                    <button
                      disabled={currSecond < 9}
                      onClick={stopRecordingHandler}
                      className="stopBtn"
                    >
                      <div></div>
                      <div className="tooltip">
                        <p>영상은 최소 10초 이상 촬영해야 합니다</p>
                      </div>
                    </button>
                  </>
                )}
                {isEnd && (
                  <InterviewForm
                    category={question.category}
                    question={question.contents}
                    reset={resetHandler}
                    questionId={question.id}
                    thumbnail={thumbnail}
                    ref={recorderRef}
                    loadingHandler={loadingHandler}
                  />
                )}
              </div>
              <canvas style={{ display: "none" }} ref={thumbnailRef} />
            </>
          )}
        </div>
      )}
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 20px 0px;
    ${({ theme }) => theme.device.tablet} {
      padding: 0px 1rem;
    }
  }

  & .header .title {
    max-width: 750px;
    width: 100%;
  }

  .slide {
    width: 100%;
    margin: 0px 12px;
  }

  & .badge {
    font-size: ${({ theme }) => theme.fontSize["16"]};
    color: ${({ theme }) => theme.colors.main};
  }

  & .alarm {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 7px;
    margin-top: 12px;
    border-radius: 8px;
    border: 1px solid rgba(130, 130, 130, 0.2);
    padding: 8px 12px;
    font-size: ${({ theme }) => theme.fontSize["16"]};
    box-shadow: 0 2px 5px rgba(130, 130, 130, 0.1);
  }

  .stopBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 44px;
    border: 1px solid
      ${({ theme, currSecond }) =>
        currSecond > 9 ? theme.colors.errorMsg : theme.colors.grey10};
    background-color: ${({ theme, currSecond }) =>
      currSecond > 9 ? "" : theme.colors.grey10};
    border-radius: 50%;
    position: relative;

    div {
      width: 12px;
      height: 12px;
      background-color: ${({ theme, currSecond }) =>
        currSecond > 9 ? theme.colors.errorMsg : theme.colors.grey40};
    }
  }

  .stopBtn:hover {
    cursor: ${({ currSecond }) => (currSecond > 9 ? "pointer" : "not-allowed")};
    background-color: ${({ currSecond }) =>
      currSecond > 9 ? "rgba(236, 89, 89, 0.06)" : ""};
  }

  .tooltip {
    display: none;
    position: absolute;
  }

  .stopBtn:hover {
    .tooltip {
      bottom: -35px;
      display: ${({ currSecond }) => (currSecond > 9 ? "none" : "flex")};
      justify-content: center;
      align-items: center;
      width: max-content;
      padding: 12px 10px;
      background: rgba(0, 0, 0, 0.3);
      color: ${({ theme }) => theme.colors.white};
      border-radius: 6px;
    }
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
    color: ${({ theme }) => theme.colors.main};
    font-size: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    margin: 0;
    transform: translate(-50%, -50%);
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      p {
        font-size: 18px;
        color: ${({ theme }) => theme.colors.grey70};
      }
    }
  }

  svg:hover {
    cursor: pointer;
  }
`;

export default InterviewRecording;
