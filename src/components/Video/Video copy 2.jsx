import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import feedbackApis from "../../apis/feedbackApis.js";

import { BsFillPlayBtnFill } from "react-icons/bs";

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
      <div className="play_area">
        <div className="player_outro_area">
          <div className="player_container">
            <div className="video_wrapper">
              <video controls src={video}></video>
            </div>

            <div className="video_control">
              <BsFillPlayBtnFill />
            </div>
            <div className="like_box">
              <label>
                <span>좋아히기</span>
                <button>💜</button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  & .play_area {
    position: relative;

    & .player_outro_area {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      height: 500px;
    }

    & .player_container {
      position: relative;
      max-width: 750px;
      width: 100%;
    }

    & .video_wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #000;
      /* overflow: hidden; */
      video {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    & .like_box {
      position: relative;
    }

    & .video_control {
      position: absolute;
    }
  }
`;
const playBtn = styled(BsFillPlayBtnFill)`
  font-size: 24px;
  color: #ec5959;
`;
// const playBtn = styled(BsFillPlayBtnFill)`
//   width: 6.5em;
//   height: 4em;
//   margin-right: 1em;
//   color: #fff;
//   position: relative;
// `;

const VideoContainer = styled.video``;

export default Video;
