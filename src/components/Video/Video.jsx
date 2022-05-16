import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styled from "styled-components";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import VideoControl from "./VideoControl.jsx";
import feedbackApis from "../../apis/feedbackApis.js";
import Bubble from "./Bubble.jsx";
import { MdFavorite, MdFastRewind, MdFastForward } from "react-icons/md";
import LoadingLoader from "../UI/LoadingLoader.jsx";

function format(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(string) {
  return ("0" + string).slice(-2);
}
let count = 0;

const Video = (props) => {
  let [isLoading, setIsLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const videoRef = useRef(null);
  const videoControllerRef = useRef(null);
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);

  const { cardId } = props;
  const navigate = useNavigate();
  const [video, setVideo] = useState("");
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [likes, setLikes] = useState({ likeTime: [], like: [] });
  const [state, setState] = useState({
    playing: true,
    muted: false,
    controls: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    duration: 0,
    pip: false,
  });
  const cleanLike = useRef((id) => {
    setLikes((currentLikes) => ({
      likeTime: [...currentLikes.likeTime],
      like: currentLikes.like.filter((like) => like !== id),
    }));
  });

  const { playing, muted, volume, playbackRate, played, pip, seeking } = state;
  useEffect(() => {
    feedbackApis
      .getDetailVideo(cardId)
      .then((data) => {
        console.log(data);
        setVideo(URL.createObjectURL(data));
        setIsLoading(false);
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

  const volumeSeekDownHandler = (e, newValue) => {
    console.log(newValue, "");
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
    console.log(volume, muted, "committed");
  };
  console.log(seeking, "seeking!!");
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
    if (controlsRef.current.style.visibility === "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const onSeekChangeHandler = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const seekMouseDownHandler = (e) => {
    setState({ ...state, seeking: true });
  };

  const seekMouseUpHandler = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    videoRef.current.seekTo(newValue / 100, "fraction");
  };

  const displayFormatHandler = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };

  const currentTime =
    videoRef && videoRef.current ? videoRef.current.getCurrentTime() : "00:00";

  const duration =
    videoRef && videoRef.current ? videoRef.current.getDuration() : "00:00";

  // 현재시간
  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);
  console.log(totalDuration, "duration!!");
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
    const likeCopy = [...likes.likeTime];
    likeCopy.push({
      time: videoRef.current.getCurrentTime(),
      display: format(videoRef.current.getCurrentTime()),
      image: dataUri,
    });
    setLikes((prev) => ({
      likeTime: likeCopy,
      like: [...prev.like, new Date().getTime()],
    }));
  };

  const mouseMoveHandler = () => {
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
      {isLoading ? (
        <LoadingLoader
          text="영상을 불러오는 중입니다. "
          noti="잠시만 기다려주세요."
        />
      ) : (
        <>
          <VideoBackgroud>
            <div
              ref={videoControllerRef}
              className="player-wrapper"
              onMouseMove={mouseMoveHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              <ReactPlayer
                ref={videoRef}
                url={video}
                // url={{ src: video, type: "video/mp4" }}
                // url={{
                //   src: video,
                //   type: "video/mp4",
                //   codecs: "avc1.4D401E, mp4a.40.2",
                // }}
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
                onVolumeSeekDown={volumeSeekDownHandler}
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
              <div
                style={{
                  zIndex: 1000,
                  position: "absolute",
                  bottom: "75px",
                  right: "10px",
                }}
              >
                <button className="like_btn" onClick={addLike}>
                  <LikeIcon size={35} />
                </button>
                {likes.like.map((id) => (
                  <Bubble onAnimationEnd={cleanLike.current} key={id} id={id} />
                ))}
              </div>
            </div>
          </VideoBackgroud>
          <HightLight>
            <div className="highlight_bar">
              <h2>Highlight</h2>
              <div className="timestamp_box">
                {likes.likeTime.map((like, index) => (
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
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;
const VideoBackgroud = styled.div`
  width: 100%;
  background: #f4f6f9;
  .player-wrapper {
    position: relative;
    max-width: 750px;
    width: 100%;
    margin: 0 auto;
    .react-player {
    }
  }
`;

const HightLight = styled.div`
  margin-top: 20px;
  max-width: 750px;
  width: 100%;
  margin: 0 auto;
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

const LikeIcon = styled(MdFavorite)`
  font-size: 20px;
  /* color: ${({ theme }) => theme.colors.pink}; */
  color: white;
  &:hover {
    color: ${({ theme }) => theme.colors.pink};
  }
`;

// pink : #EA617A
// main : ##567FE8
// yellow : #EAB90D

export default Video;
