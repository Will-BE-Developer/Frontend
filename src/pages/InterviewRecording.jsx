import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RecordRTC from "recordrtc";
import Countdown from "react-countdown";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import styled from "styled-components";
import { BsAlarm, BsStopCircle } from "react-icons/bs";
import GlobalButton from "../components/UI/GlobalButton";
import InterviewForm from "../components/interview/InterviewForm";
import instance from "../apis/axios";

const InterviewRecording = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const recorderRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [thumbnail, setThumbnail] = useState();
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [time, setTime] = useState();
  const [question, setQuestion] = useState();

  console.log(question);

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

      setIsStart(true);
    } catch (err) {
      console.log(err);
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

        console.log(videoWidth, videoHeight);
        thumbnailRef.current.toBlob((blob) => setThumbnail(blob));
      }, 1000);

      return;
    }

    instance
      .get(`/api/questions/${state}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const timer = setTimeout(() => {
      recordingHandler();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [recordingHandler, isEnd, state]);

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

  return (
    <RecordWrapper>
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <div className="header">
          <p>면접주제</p>
          <div className="title">
            <span>Q.Recoil 장점을 말해주세요.</span>
            {isStart && !isEnd && (
              <span className="alarm">
                <BsAlarm />
                <Timer active duration={300000}>
                  <Timecode format="H:?mm:ss" style={{ color: "black" }} />
                </Timer>
                <Timer
                  active
                  onFinish={stopRecordingHandler}
                  duration={300000}
                  onTimeUpdate={({ time }) => setTime(time)}
                />
                <Timecode
                  time={301000 - time}
                  format="H:?mm:ss"
                  style={{ color: "black" }}
                />
              </span>
            )}
          </div>
        </div>
        <div style={{ position: "relative", textAlign: "end" }}>
          <video controls autoPlay ref={videoRef} />
          {!isStart && (
            <h1 className="count">
              <Countdown
                date={Date.now() + 5000}
                renderer={({ seconds }) => seconds}
              />
            </h1>
          )}
          {/* {isStart && !isEnd && (
            <Countdown
              date={Date.now() + 300000}
              zeroPadTime={2}
              renderer={({ seconds, minutes, completed }) => (
                <h3 style={{ margin: 0 }}>
                  {completed && stopRecordingHandler()}
                  <span>
                    Timer : {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                  </span>
                </h3>
              )}
            />
          )} */}
        </div>
        <div style={{ textAlign: "center" }}>
          {!isStart && (
            <GlobalButton onClick={() => navigate(-1)}>
              주제 다시 선택하기
            </GlobalButton>
          )}
          {isStart && !isEnd && (
            <BsStopCircle
              onClick={stopRecordingHandler}
              size="40"
            ></BsStopCircle>
          )}
          {isEnd && <InterviewForm thumbnail={thumbnail} ref={recorderRef} />}
        </div>
        <canvas ref={thumbnailRef} />
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

  & .header {
    margin: 20px 0px;
  }

  & .header .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: ${({ theme }) => theme.fontSize["20"]};
  }

  & .alarm {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid rgba(130, 130, 130, 0.2);
    padding: 8px 10px;
    font-size: 16px;
    color: #b3b3b3;
  }

  video {
    width: 100%;
    border-radius: 6px;
    margin-bottom: 20px;
  }

  canvas {
    display: none;
  }

  & .count {
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
