import styled from "styled-components";
import ReactPlayer from "react-player";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import feedbackApis from "../../apis/feedbackApis.js";
import logo from "../../assets/logo.png";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { MdFavorite, MdFastRewind, MdFastForward } from "react-icons/md";

const Video = (props) => {
  console.log(props);
  const { cardId } = props;
  const navigate = useNavigate();
  const [video, setVideo] = useState("");

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

  return (
    <Container>
      <div className="player-wrapper">
        <ReactPlayer
          url={video}
          playing
          className="react-player"
          width={"100%"}
          height={"100%"}
        />

        <div className="controls_wrapper">
          <div className="control_box">
            {/* header */}
            <div className="header">
              <div className="logo">
                <img alt="logo" src={logo} />
              </div>
              <button className="like_btn">
                <LikeIcon />
              </button>
            </div>

            {/* body */}
            <div className="body">
              <button>
                <RewindIcon />
              </button>
              <button>
                <PlayIcon />
              </button>
              <button>
                <ForwardIcon />
              </button>
            </div>

            {/* footer */}
            <div className="footer">
              <div className="play_control_box">
                <input
                  className="range"
                  type="range"
                  min={0}
                  max={100}
                  step="any"
                  // value={played}
                  // onMouseDown={this.handleSeekMouseDown}
                  // onChange={this.handleSeekChange}
                  // onMouseUp={this.handleSeekMouseUp}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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

    .controls_wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      z-index: 1;

      & .control_box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        width: 100%;
        height: 100%;

        .header {
          width: 100%;
          display: flex;
          justify-content: space-between;

          .title {
            color: white;
          }

          .like_btn {
            background: rgba(30, 30, 30, 0.9);
            border-radius: 0.5em;
            padding: 8px;
          }
        }

        .body {
          width: 60%;
          display: flex;
          justify-content: space-around;

          button {
            font-size: 40px;
            /* color: ${({ theme }) => theme.colors.pink}; */
            color: #777;
            transform: scale(0.9);
            &:hover {
              color: white;
              transform: scale(1);
              transition: all 0.2s ease-in-out;
            }
          }
        }

        .footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;

          .play_control_box {
            width: 100%;

            input[type="range"] {
              -webkit-appearance: none;
              display: block;
              appearance: none;
              max-width: 750px;
              width: 100%;
              margin: 0;

              background: rgba(255, 255, 255, 0.6);
              cursor: pointer;
              border: 1px solid #000000;
              height: 6px;
              &:focus {
                outline: none;
              }
            }

            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 15px;
              width: 15px;
              border-radius: 50%;
              background: #567fe8;
              color: #567fe8;
            }
          }
        }
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
