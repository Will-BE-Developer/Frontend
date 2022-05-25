import React, { forwardRef, useState } from "react";
import { getCookie } from "../../shared/cookies";

import theme from "../../styles/theme";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import Popover from "@mui/material/Popover";

import { BsFillBookmarkFill } from "react-icons/bs";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import { MdFastRewind, MdFastForward } from "react-icons/md";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

const PrettoSlider = styled(Slider)({});

const VideoControl = forwardRef(
  (
    {
      onPlayPause,
      playing,
      onRewind,
      onForward,
      muted,
      onMute,
      onVolumeChange,
      onVolumeSeekUp,
      volume,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      played,
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      elapsedTime,
      totalDuration,
      onChangeDisplayFormat,
      scrapHandler,
      isScrapped,
      openModalHandler,
    },
    ref
  ) => {
    const token = getCookie("token");

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handlePopover = (event) => {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    };

    const handleClose = () => {
      setAnchorEl(null);
      setOpen(false);
    };

    const valueLabelFormat = (value) => {
      let _elapsedTime = value;
      _elapsedTime = elapsedTime;
      return _elapsedTime;
    };

    return (
      <Container className="controls_wrapper">
        <div ref={ref} className="control_box">
          {/* header */}
          <div className="header">
            <div className="logo">
              <img alt="logo" src={logo} />
            </div>
            <button
              style={{
                color: isScrapped ? theme.colors.main : "#fff",
              }}
              className="scrap_btn"
              onClick={token ? scrapHandler : openModalHandler}
            >
              <ScrapIcon />
              <div className="tooltip">좋았던 면접 영상을 저장하세요!</div>
            </button>
          </div>

          {/* body */}
          <div className="body">
            <button onClick={onRewind}>
              <RewindIcon />
            </button>
            <button onClick={onPlayPause}>
              {!playing ? (
                <PlayIcon className="play_icon" onClick={onPlayPause} />
              ) : (
                <PauseIcon className="play_icon" onClick={onPlayPause} />
              )}
            </button>
            <button onClick={onForward}>
              <ForwardIcon />
            </button>
          </div>

          {/* footer */}
          <div className="footer">
            <div className="play_control_box">
              <div className="slider">
                <PrettoSlider
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  aria-label="custom thumb label"
                  value={played * 100}
                  onChange={onSeek}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onSeekMouseUp}
                  valueLabelFormat={valueLabelFormat}
                  sx={{
                    color: "#567FE8",
                    height: 4,
                    "& .MuiSlider-thumb": {
                      width: 8,
                      height: 8,

                      "&:before": {
                        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                      },
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
                      },
                      "&.Mui-active": {
                        width: 20,
                        height: 20,
                      },
                    },
                    "& .MuiSlider-rail": {
                      opacity: 0.28,
                    },
                    "& .MuiSlider-valueLabel": {
                      lineHeight: 1.2,
                      fontSize: 12,
                      background: "unset",
                      padding: 0,
                      width: 32,
                      height: 32,
                      borderRadius: "50% 50% 50% 0",
                      backgroundColor: "#567FE8",
                      transformOrigin: "bottom left",
                      transform:
                        "translate(50%, -100%) rotate(-45deg) scale(0)",
                      "&:before": { display: "none" },
                      "&.MuiSlider-valueLabelOpen": {
                        transform:
                          "translate(50%, -100%) rotate(-45deg) scale(1)",
                      },
                      "& > *": {
                        transform: "rotate(45deg)",
                      },
                    },
                  }}
                />
              </div>
              <div className="functions_box">
                <div className="basic_box">
                  <button>
                    {!playing ? (
                      <PlayIcon className="play_icon" onClick={onPlayPause} />
                    ) : (
                      <PauseIcon className="play_icon" onClick={onPlayPause} />
                    )}
                  </button>
                  <div className="volume_box">
                    <button onClick={onMute}>
                      {muted ? (
                        <HiVolumeOff className="volume_icon" />
                      ) : (
                        <HiVolumeUp className="volume_icon" />
                      )}
                    </button>
                    <Slider
                      className="volume_slider"
                      min={0}
                      max={100}
                      value={
                        muted ? 0 : !muted && volume === 0 ? 50 : volume * 100
                      }
                      onChange={onVolumeChange}
                      aria-label="Default"
                      onMouseDown={onSeekMouseDown}
                      onChangeCommitted={onVolumeSeekUp}
                      valueLabelDisplay="off"
                      sx={{
                        color: "#567FE8",
                        height: 4,
                        "& .MuiSlider-thumb": {
                          width: 8,
                          height: 8,
                          "&:before": {
                            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                          },
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
                          },
                          "&.Mui-active": {
                            width: 20,
                            height: 20,
                          },
                        },
                        "& .MuiSlider-rail": {
                          opacity: 0.28,
                        },
                      }}
                    />
                  </div>
                  <button
                    className="video_time"
                    onClick={onChangeDisplayFormat}
                  >
                    {elapsedTime}/{totalDuration}
                  </button>
                </div>

                <div className="sub_box">
                  <button onClick={handlePopover} className="speed">
                    <h1>{playbackRate}X</h1>
                  </button>
                  <Popover
                    id={open ? "playbackrate-popover" : undefined}
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <div
                        className="speed_box"
                        key={rate}
                        onClick={() => setOpen(false)}
                      >
                        <button
                          onClick={() => onPlaybackRateChange(rate)}
                          className="speed_btn"
                          style={{
                            color: rate === playbackRate ? "#EA617A" : "",
                          }}
                        >
                          <h1>{rate}</h1>
                        </button>
                      </div>
                    ))}
                  </Popover>

                  <button className="fullscreen" onClick={onToggleFullScreen}>
                    <BiFullscreen />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
);

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }

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

      .tooltip {
        position: absolute;
        top: 16px;
        right: 60px;
        display: none;
        width: 200px;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border-radius: 10px;
        :after {
        }
      }

      .scrap_btn {
        background: rgba(30, 30, 30, 0.9);
        border-radius: 0.5em;
        padding: 8px;
        &:hover {
          color: black;
          .tooltip {
            display: block;
          }
        }
      }
    }

    .body {
      width: 60%;
      display: flex;
      justify-content: space-around;

      button {
        font-size: 40px;
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
      padding: 0px;

      .play_control_box {
        width: 100%;
        .slider {
        }
      }
      .functions_box {
        display: flex;
        justify-content: space-between;

        .basic_box {
          flex-grow: 1;
          display: flex;
          justify-content: flex-start;

          .play_icon {
            font-size: 30px;
            color: #777;
            transform: scale(0.9);
            &:hover {
              color: white;
              transform: scale(1);
              transition: all 0.2s ease-in-out;
            }
          }
          .volume_box {
            display: flex;
            width: 100%;
            .volume_icon {
              font-size: 20px;
              color: #777;
              transform: scale(0.9);

              &:hover {
                color: white;
                transform: scale(1);
                transition: all 0.2s ease-in-out;
              }
            }

            .volume_slider {
              margin-left: 8px;
              width: 100%;
            }
          }
          .video_time {
            color: white;
            margin-left: 16px;
          }
        }

        .sub_box {
          flex-grow: 3;
          display: flex;
          justify-content: flex-end;
          .speed {
            color: white;
          }
          .speed_box {
            display: flex;
            flex-direction: colum;

            .speed_btn {
              background: white;
              width: 50px;
              height: 50px;
              &:hover {
                color: red;
              }
              h1 {
                color: white;
              }
            }
          }

          .fullscreen {
            font-size: 18px;
            color: white;
          }
        }
      }
    }
  }
`;

const ScrapIcon = styled(BsFillBookmarkFill)`
  font-size: 16px;
  margin: 0 2px;
`;

const PlayIcon = styled(BsFillPlayFill)``;

const PauseIcon = styled(BsFillPauseFill)``;
const RewindIcon = styled(MdFastRewind, MdFastForward, BsFillPlayFill)``;
const ForwardIcon = styled(MdFastForward)``;

VideoControl.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default VideoControl;
