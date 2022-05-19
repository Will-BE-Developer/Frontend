import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../shared/cookies";
import ReactPlayer from "react-player";
import screenfull from "screenfull";

import VideoControl from "./VideoControl.jsx";
import feedbackApis from "../../apis/feedbackApis.js";
import highlightApis from "../../apis/highlightApis.js";

import LoadingLoader from "../UI/LoadingLoader.jsx";
import questionMark from "../../assets/questionMark.svg";
import convertingImg from "../../assets/convertingImage.svg";

import Bubble from "./Bubble.jsx";
import GlobalModal from "../UI/GlobalModal";
import styled, { css } from "styled-components";
import { boxShadow } from "../../styles/boxShadow.js";
import { MdFavorite } from "react-icons/md";
import { IoAlertCircle } from "react-icons/io5";

function format(seconds) {
  if (isNaN(seconds)) {
    return `00:00`;
  }
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
let likeCount = 0;

const Video = (props) => {
  const token = getCookie("token");
  const [openModal, setOpenModal] = useState(false);

  let [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);
  const videoControllerRef = useRef(null);
  const controlsRef = useRef(null);

  const { cardId, scrapHandler, isScrapped } = props;
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

  const { playing, muted, volume, playbackRate, played, pip } = state;

  useEffect(() => {
    feedbackApis
      .getDetail(cardId)
      .then((data) => {
        setVideo(data.interview.video);
      })
      .catch(() => {
        navigate("/notFound");
        return;
      });
    const timeout = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timeout);
  }, [cardId, navigate]);

  useEffect(() => {
    highlightApis
      .getHighlight(cardId)
      .then((data) => {
        const filteredLike = [data.topOne, data.topTwo, data.topThree]
          .filter((time) => time >= 0)
          .map((item) => (item === 0 ? 3 : item));
        const newLike = [];
        filteredLike.map((time) =>
          newLike.push({
            time,
            display: format(time),
          })
        );
        setLikes((prev) => ({
          likeTime: newLike,
          like: [...prev.like, new Date().getTime()],
        }));
      })
      .catch((err) => console.log("좋아요 받기 오류", err));
  }, [cardId]);

  const addLikeHandler = () => {
    if (!token) {
      alert("로그인이 필요한 기능입니다. ");
      return;
    }
    likeCount++;
    setLikes((prev) => ({
      likeTime: [...prev.likeTime],
      like: [...prev.like, new Date().getTime()],
    }));
    // console.log(Math.floor(videoRef.current.getCurrentTime()));
  };

  useEffect(() => {
    const intervalPost = setInterval(() => {
      if (likeCount === 0) {
        return;
      }
      let currentTime = Math.floor(videoRef.current.getCurrentTime());
      const likeData = {
        interviewId: cardId,
        time: currentTime,
        count: likeCount,
      };
      highlightApis
        .addHighlight(likeData)
        .then((data) => {
          const filteredLike = [data.topOne, data.topTwo, data.topThree]
            .filter((time) => time >= 0)
            .map((time) => (time === 0 ? 2 : time));
          const newLike = [];
          filteredLike.map((time) =>
            newLike.push({
              time,
              display: format(time),
            })
          );
          setLikes((prev) => ({
            likeTime: newLike,
            like: [...prev.like, new Date().getTime()],
          }));
          likeCount = 0;
        })
        .catch((err) => {
          console.log("좋아요 요청 오류", err);
        });
    }, 6000);

    return () => clearInterval(intervalPost);
  }, [cardId, token]);

  const cleanLike = useRef((id) => {
    setLikes((currentLikes) => ({
      likeTime: [...currentLikes.likeTime],
      like: currentLikes.like.filter((like) => like !== id),
    }));
  });
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

  const volumeChangeHandler = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const volumeSeekDownHandler = (e, newValue) => {
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

  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  const mouseMoveHandler = () => {
    if (video !== null) {
      controlsRef.current.style.visibility = "visible";
      count = 0;
    }
  };

  const mouseLeaveHandler = () => {
    if (video !== null) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
  };

  const linkToSignInHandler = () => {
    navigate("/signin");
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };
  return (
    <Container>
      <GlobalModal
        title="알림"
        confirmText="로그인하러 가기"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => linkToSignInHandler()}
        isConfirm
        isIcon
        icon={<AlertIcon />}
      >
        로그인이 필요한 기능입니다.
      </GlobalModal>
      {isLoading ? (
        <VideoBackgroud>
          <LoadingLoader
            text="영상을 불러오는 중입니다. "
            noti="잠시만 기다려주세요."
            _height="565px"
          />
        </VideoBackgroud>
      ) : (
        <>
          <VideoBackgroud>
            <div
              ref={videoControllerRef}
              className="player-wrapper"
              onMouseMove={mouseMoveHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              {video === null ? (
                <img
                  src={convertingImg}
                  className="converting_img"
                  alt="convertingImg"
                ></img>
              ) : (
                <>
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
                    onChangeDisplayFormat={displayFormatHandler}
                    cardId={cardId}
                    scrapHandler={scrapHandler}
                    isScrapped={isScrapped}
                    openModalHandler={openModalHandler}
                  />
                  <div
                    style={{
                      zIndex: 1000,
                      position: "absolute",
                      bottom: "75px",
                      right: "10px",
                    }}
                  >
                    <button
                      className="like_btn"
                      onClick={token ? addLikeHandler : openModalHandler}
                    >
                      <div className="tooltip">좋았던 순간을 클릭하세요!</div>
                      <LikeIcon size={35} />
                    </button>

                    {likes.like.map((id) => (
                      <Bubble
                        onAnimationEnd={cleanLike.current}
                        key={id}
                        id={id}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </VideoBackgroud>
          {video !== null && (
            <HightLight>
              <div className="highlight_bar">
                <div className="contents_box">
                  <div className="title">
                    <span>
                      하이라이트 <img src={questionMark} alt="questionMark" />
                      <div className="tooltip_highlight">
                        가장 좋아요를 많이 받은 TOP3 시간입니다. <br /> 클릭하면
                        해당 시간대로 이동합니다.
                      </div>
                    </span>
                    <span className="line">|</span>
                  </div>
                  {likes?.likeTime.length === 0 ? (
                    <div className="noti">
                      아직 하이라이트 시간이 없습니다. 좋아요를 눌러
                      하이라이트를 채워주세요!
                    </div>
                  ) : (
                    likes.likeTime.map((like, index) => {
                      return (
                        <div
                          className="timestamp_box"
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
                          <button>{like.display}</button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </HightLight>
          )}
        </>
      )}
    </Container>
  );
};
const AlertIcon = styled(IoAlertCircle)`
  font-size: 24px;
  color: #ec5959;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  margin-bottom: 40px;
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
    .converting_img {
      width: 100%;
      -webkit-user-drag: none;
    }
  }

  .tooltip {
    position: absolute;
    right: 50px;
    display: none;

    width: 200px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px;

    border-radius: 10px;
    color: ${({ theme }) => theme.colors.main};
    :after {
    }
  }

  .like_btn {
    display: flex;
    &:hover {
      color: black;
      .tooltip {
        display: block;
      }
    }
  }
`;

const HightLight = styled.div`
  ${({ theme }) => {
    const { colors, fontSize, device } = theme;

    return css`
      max-width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 72px;
      ${boxShadow()};
      width: 100%;
      margin: 0 auto;
      h2 {
        font-size: 16px;
      }

      .highlight_bar {
        width: 90%;
        .contents_box {
          display: flex;
          justify-content: center;
          align-items: center;

          .title {
            color: ${colors.grey80};
            white-space: nowrap;
            .tooltip_highlight {
              position: absolute;
              display: none;
              margin: 10px 0 0 20px;
              width: 300px;
              font-size: 14px;
              background: rgba(0, 0, 0, 0.3);
              padding: 12px 10px;
              border-radius: 10px;
              line-height: 16px;
              color: ${({ theme }) => theme.colors.white};
              :after {
              }
            }
            span {
              :first-child {
                cursor: pointer;
                img {
                  display: inline-block;
                  vertical-align: middle;
                  margin-bottom: 2px;
                }
                &:hover {
                  .tooltip_highlight {
                    display: block;
                  }
                }
              }

              font-size: ${fontSize["12"]};
              margin-right: 16px;
              .line {
                width: 1px;
                color: ${colors.grey10};
              }
            }
          }
        }

        .noti {
          font-size: 12px;
          color: ${colors.grey80};
          ${device.mobile} {
          }
        }
        .timestamp_box {
          display: flex;
          justify-content: center;
          max-width: 275px;
          height: 40px;
          gap: 16px;
          button {
            color: ${colors.like};
            text-decoration: underline;
            background: rgba(234, 97, 122, 0.06);
            padding: 10px 20px;
            border-radius: 4px;
            margin-right: 10px;
          }

          /* 아직 사용안하는중 get하고.. */
          .timestamp {
            background: rgba(234, 97, 122, 0.06);
            padding: 10px 20px;
            font-size: ${fontSize["16"]};
            cursor: pointer;
            div {
              ${colors.like};
              text-decoration: underline;
            }
          }
        }
      }
    `;
  }}
`;

const LikeIcon = styled(MdFavorite)`
  font-size: 20px;
  /* color: ${({ theme }) => theme.colors.pink}; */
  color: white;

  &:hover {
    color: ${({ theme }) => theme.colors.pink};
  }

  animation: pulse 1s infinite;
  @keyframes pulse {
    0% {
      transform: scale(1.04);
      box-shadow: 0;
    }
    80% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Video;
