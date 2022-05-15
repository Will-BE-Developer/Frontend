import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styled from "styled-components";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import VideoControl from "./VideoControl.jsx";
import feedbackApis from "../../apis/feedbackApis.js";

import { useTheme } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
// import ValueLabelComponent from "./ValueLabelComponent";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import { MdFavorite, MdFastRewind, MdFastForward } from "react-icons/md";
import { HiVolumeUp } from "react-icons/hi";

// React player demo 모음
// https://github.com/cookpete/react-player/blob/master/src/demo/App.js

// const format = (seconds) => {
//   if (isNaN(seconds)) {
//     return "00:00";
//   }
//   const date = new Date(seconds * 1000);
//   const mm = date.getUTCMinutes();
//   const ss = date.getUTCSeconds().toString.padStart(2, "0");

//   return `${mm}: ${ss}`;
// };

const format = (seconds) => {
  console.log(seconds, "seconds");

  if (isNaN(seconds)) {
    return `00:00`;
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

const Video = (props) => {
  const videoRef = useRef(null);
  const videoControllerRef = useRef(null);
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);

  console.log(props);
  const { cardId } = props;
  const navigate = useNavigate();
  const [video, setVideo] = useState("");
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [likes, setLikes] = useState([]);
  const [state, setState] = useState({
    playing: true,
    muted: true,
    controls: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    duration: 0,
    pip: false,
  });

  const { playing, muted, volume, playbackRate, played, pip, seeking } = state;
  useEffect(() => {
    feedbackApis
      .getDetailVideo(cardId)
      .then((data) => {
        setVideo(URL.createObjectURL(data));
      })
      .catch(() => {
        navigate("/notFound");
        return;
      });
  }, [cardId, navigate]);

  const playPauseHandler = () => {
    setState({ ...state, playing: !state.playing });
  };

  const rewindHandler = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime() - 3);
  };

  const forwardHandler = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime() + 3);
  };
  const muteHandler = () => {
    setState({ ...state, muted: !state.muted });
  };

  const durationHandelr = (duration) => {
    setState({ ...state, duration });
  };

  const volumeChangeHandler = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const volumeSeekUpHandler = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const playBackChangeHandler = (rate) => {
    setState({
      ...state,
      playbackRate: rate,
    });
  };

  const toggleFullScreenHandler = () => {
    screenfull.toggle(videoControllerRef.current);
  };

  const progressHandler = (changeState) => {
    console.log("onProgress", state);

    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if ((controlsRef.current.style.visibility = "visible")) {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  // We only want to update time slider if we are not currently seeking
  const onSeekChangeHandler = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const seekMouseDownHandler = (e) => {
    setState({ ...state, seeking: true });
  };

  const seekMouseUpHandler = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    videoRef.current.seekTo(newValue / 100, "fraction");
  };

  const displayFormatHandler = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };

  const currentTime =
    videoRef && videoRef.current ? videoRef.current.getCurrentTime() : "00:00";

  const duration =
    videoRef && videoRef.current ? videoRef.current.getDuration() : "00:00";

  // 현재시간
  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  const addLike = () => {
    const canvas = canvasRef.current;
    canvas.width = 160;
    canvas.height = 90;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      videoRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height
    );
    const dataUri = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;
    const likeCopy = [...likes];
    likeCopy.push({
      time: videoRef.current.getCurrentTime(),
      display: format(videoRef.current.getCurrentTime()),
      image: dataUri,
    });
    setLikes(likeCopy);
  };

  const mouseMoveHandelr = () => {
    console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const mouseLeaveHandler = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  return (
    <Container>
      <div
        ref={videoControllerRef}
        className="player-wrapper"
        onMouseMove={mouseMoveHandelr}
        onMouseLeave={mouseLeaveHandler}
      >
        <ReactPlayer
          ref={videoRef}
          url={video}
          pip={pip}
          playing={playing}
          controls={false}
          muted={muted}
          volume={volume}
          playbackRate={playbackRate}
          className="react-player"
          width="100%"
          height="100%"
          // onSeek={(e) => console.log("onSeek", e)}
          onProgress={progressHandler}
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
              },
            },
          }}
        />
        <VideoControl
          ref={controlsRef}
          onPlayPause={playPauseHandler}
          playing={playing}
          onRewind={rewindHandler}
          onForward={forwardHandler}
          muted={muted}
          onMute={muteHandler}
          onVolumeChange={volumeChangeHandler}
          onVolumeSeekUp={volumeSeekUpHandler}
          volume={volume}
          playbackRate={playbackRate}
          onPlaybackRateChange={playBackChangeHandler}
          onToggleFullScreen={toggleFullScreenHandler}
          played={played}
          onSeek={onSeekChangeHandler}
          onSeekMouseDown={seekMouseDownHandler}
          onSeekMouseUp={seekMouseUpHandler}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onDuration={durationHandelr}
          onChangeDisplayFormat={displayFormatHandler}
          onLike={addLike}
        />
      </div>
      <HightLight>
        {" "}
        <div className="highlight_bar">
          <h2>Highlight</h2>
          <div className="timestamp_box">
            {likes.map((like, index) => (
              <div
                className="timestamp"
                key={index}
                onClick={() => {
                  videoRef.current.seekTo(like.time);
                  controlsRef.current.style.visibility = "visible";

                  setTimeout(() => {
                    controlsRef.current.style.visibility = "hidden";
                  }, 1000);
                }}
                elevation={3}
              >
                {/* <img alt="likes" crossOrigin="anonymous" src={like.image} /> */}
                <span>{like.display}</span>
              </div>
            ))}
          </div>
        </div>
      </HightLight>
      <canvas ref={canvasRef} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  max-width: 750px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  .player-wrapper {
    position: relative;
    width: 100%;

    .react-player {
    }
  }
`;

const HightLight = styled.div`
  margin-top: 20px;
  h2 {
    font-size: 16px;
  }
  .highlight_bar {
    margin-top: 10px;

    display: flex;
    justify-content: space-around;

    .timestamp_box {
      display: flex;
      width: 85%;

      justify-content: space-around;
      background: #ea617a;
      border-radius: 4px;
      color: white;

      .timestamp {
        cursor: pointer;
      }
    }
  }
`;
// pink : #EA617A
// main : ##567FE8
// yellow : #EAB90D

const LikeIcon = styled(MdFavorite)`
  font-size: 20px;
  /* color: ${({ theme }) => theme.colors.pink}; */
  color: white;
  &:hover {
    color: ${({ theme }) => theme.colors.pink};
  }
`;

const PlayIcon = styled(BsFillPlayFill)``;

const PauseIcon = styled(BsFillPauseFill)``;
const RewindIcon = styled(MdFastRewind, MdFastForward, BsFillPlayFill)``;
const ForwardIcon = styled(MdFastForward)``;

// const playBtn = styled(BsFillPlayBtnFill)`
//   width: 6.5em;
//   height: 4em;
//   margin-right: 1em;
//   color: #fff;
//   position: relative;
// `;

const VideoContainer = styled.video``;

export default Video;
