import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../shared/cookies";
import theme from "../../styles/theme";
import styled, { css } from "styled-components";
import GlobalButton from "../../components/UI/GlobalButton";
import { BsBookmark, BsHeartFill, BsFillBookmarkFill } from "react-icons/bs";
import { IoAlertCircle } from "react-icons/io5";

import GlobalModal from "../../components/UI/GlobalModal";
import UserProfileModal from "../../components/UI/ModalSample/UserProfileModal";
import defaultUserImage from "../../assets/defaultUserImage.png";

import feedbackApis from "../../apis/feedbackApis.js";
import Comments from "../../components/Comments/Comments";
import Video from "../../components/Video/Video";

import Gold from "../../assets/icons/gold.png";
import Silver from "../../assets/icons/silver.png";
import Bronze from "../../assets/icons/bronze.png";

const FeedBackDetail = (props) => {
  const token = getCookie("token");
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [video, setVideo] = useState("");
  const [data, setData] = useState([]);
  const [isMine, setIsMine] = useState();
  const [isScrapped, setIsScrapped] = useState();
  const [scrapCount, setScrapCount] = useState();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openSigninModal, seOpenSigninModal] = useState(false);

  const [badge, setBadge] = useState({
    color: "",
    month: "",
    week: "",
    ranking: "",
  });

  const sendProfileModalHandler = (boolean) => {
    setOpenProfileModal(boolean);
  };

  const badgeImg = [Gold, Silver, Bronze];

  let badgeIcon;
  if (badge.color === "Gold") {
    badgeIcon = badgeImg[0];
  }
  if (badge.color === "Silver") {
    badgeIcon = badgeImg[1];
  }
  if (badge.color === "Bronze") {
    badgeIcon = badgeImg[2];
  }

  const weekChar = { 1: "첫", 2: "둘", 3: "셋" };

  useEffect(() => {
    feedbackApis
      .getDetail(cardId)
      .then((data) => {
        setData(data.interview);
        setIsScrapped(data.interview.scrapsMe);
        setScrapCount(data.interview.scrapsCount);
        setIsMine(data.interview.isMine);
        setVideo(data.interview.video);

        setBadge((prev) => {
          return {
            ...prev,
            color: data.interview.badge,
            month: data.interview.month,
            week: data.interview.week,
            ranking: data.interview.ranking,
          };
        });
      })

      .catch((err) => {
        console.log(err);
        navigate("/notFound");
        return;
      });
  }, [cardId, navigate]);

  const { question, user, note, createdAt } = data;
  const editHandler = () => {
    navigate(`/feedback/${cardId}/update`, { state: { data, video } });
  };

  const clickDeleteHandler = () => {
    feedbackApis
      .deleteDetail(cardId)
      .then((data) => {
        if (data.interview?.isPublic === true) {
          navigate(`/feedback/`, { replace: true });
        } else {
          navigate("/mypage/history", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const scrapHandler = () => {
    if (!token) {
      openModalHandler();
      return;
    }
    if (isScrapped === false) {
      feedbackApis.addScrap(cardId).then((data) => {
        setIsScrapped(data.scrap.scrapsMe);
        setScrapCount(data.scrap.scrapsCount);
      });
    } else {
      feedbackApis.undoScrap(cardId).then((data) => {
        setIsScrapped(data.scrap.scrapsMe);
        setScrapCount(data.scrap.scrapsCount);
      });
    }
  };

  const linkToSignInHandler = () => {
    navigate("/signin");
  };

  const openModalHandler = () => {
    seOpenSigninModal(true);
  };

  return (
    <>
      <Container>
        <GlobalModal
          title="삭제"
          confirmText="삭제"
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={() => clickDeleteHandler()}
          isConfirm
          isIcon
          icon={<AlertIcon />}
        >
          영상을 정말 삭제하시겠습니까?
        </GlobalModal>
        <UserProfileModal
          img={user?.profileImageUrl}
          nickname={user?.nickname}
          githubLink={user?.githubLink}
          introduce={user?.introduce}
          setOpenProfileModal={sendProfileModalHandler}
          openProfileModal={openProfileModal}
          isMine={isMine}
        />
        <GlobalModal
          title="알림"
          confirmText="로그인하러 가기"
          open={openSigninModal}
          onClose={() => seOpenSigninModal(false)}
          onConfirm={() => linkToSignInHandler()}
          isConfirm
          isIcon
          icon={<AlertIcon />}
        >
          로그인이 필요한 기능입니다.
        </GlobalModal>
        <div className="contents_wrap">
          <Video
            cardId={cardId}
            scrapHandler={scrapHandler}
            isScrapped={isScrapped}
          />
          {video !== null && (
            <div className="bottom_wrap">
              {isMine && (
                <div className="user_buttons">
                  <GlobalButton
                    text="수정"
                    background={theme.colors.white}
                    color={theme.colors.main}
                    border={`1px solid ${theme.colors.main}`}
                    _height="40px"
                    onClick={editHandler}
                    hover="rgba(86, 127, 232, 0.06);"
                  />
                  <GlobalButton
                    margin="0px 10px 0px 0px"
                    background={theme.colors.errorMsg}
                    _height="40px"
                    onClick={() => setOpenDeleteModal(true)}
                    text="삭제"
                    hover="#F16E6E;"
                  />
                </div>
              )}
              <TitleContainer>
                <div className="title_box">
                  <div className="catetory_box">
                    {badge.color !== "NONE" && (
                      <>
                        <div
                          className={
                            badge.color === "Gold"
                              ? "badge_box gold"
                              : badge.color === "Silver"
                              ? "badge_box silver"
                              : "badge_box bronze"
                          }
                        >
                          <img className="badge" alt="badge" src={badgeIcon} />

                          <span>
                            {badge.month}월 {weekChar[badge.week]}째 주
                            <span>·</span>
                            {badge.ranking}등
                          </span>
                        </div>
                      </>
                    )}{" "}
                    <span className="category">{question?.category}</span>
                  </div>

                  <div className="title_question">
                    <h2>{`Q. ${question?.contents}`}</h2>
                  </div>
                </div>
              </TitleContainer>

              <AuthorContainer>
                <div className="author_box">
                  <div className="author_date">
                    <div
                      className="user_profile"
                      onClick={() => setOpenProfileModal(true)}
                    >
                      <ProfileImg
                        src={
                          user?.profileImageUrl === null
                            ? defaultUserImage
                            : user?.profileImageUrl
                        }
                      />
                      <span>{user?.nickname}</span>
                      <span className="line">|</span>
                    </div>
                    <span className="createdAt">
                      {createdAt?.slice(0, createdAt.length - 3)}
                    </span>
                  </div>
                  <div className="button_wrap">
                    <button onClick={scrapHandler}>
                      {!isScrapped ? <ScrapIcon /> : <ScrappedIcon />}
                    </button>

                    <span>{scrapCount}</span>
                  </div>
                </div>
                <span className="author_note">{note}</span>
              </AuthorContainer>

              <CommentsContainer>
                <Comments cardId={cardId} />
              </CommentsContainer>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
const AlertIcon = styled(IoAlertCircle)`
  font-size: 24px;
  color: #ec5959;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;

  & .contents_wrap {
    max-width: 1200px;
    width: 100%;
    padding: 0;
    margin: 0 auto;
  }

  .bottom_wrap {
    padding: 0 10px;
  }
  & .video_layout {
    background-color: ${({ theme }) => theme.colors.headerBgColor};
    border-radius: 6px;
    margin-bottom: 20px;
  }

  & .user_buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 10px;
    padding-bottom: 40px;
    border-bottom: 1px solid #edf0f5;
  }
`;

const TitleContainer = styled.div`
  ${({ badge, theme, bgColor }) => {
    const { colors, device, fontSize, fontWeight } = theme;
    return css`
      display: flex;
      justify-content: space-between;
      margin-top: 32px;
      & .title_box {
        & .catetory_box {
          display: flex;
          align-items: center;
          gap: 8px;

          .category {
            font-size: ${fontSize["14"]};
            color: ${colors.main};
            font-weight: 600;
            ${device.mobile} {
              font-size: ${fontSize["16"]};
            }
          }

          .badge_box {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px 8px 6px 6px;
            gap: 6px;
            width: 140px;
            height: 30px;
            font-weight: 600;
            border-radius: 999px;
            font-size: ${fontSize["14"]};
            white-space: nowrap;
            ${device.mobile} {
              padding: 3px 6px 3px 3px;
              font-size: ${fontSize["12"]};
              width: 120px;
              height: 30px;
              img {
                width: 20px;
              }
            }
          }

          .gold {
            background: rgba(233, 171, 12, 0.06);
            border: 1px solid #e9ab0c;
            span {
              color: ${colors.chip};
            }
          }
          .silver {
            background: rgba(160, 162, 169, 0.06);
            border: 1px solid #838a9b;
            span {
              color: #575c68;
            }
          }
          .bronze {
            background: rgba(159, 110, 82, 0.06);
            border: 1px solid #9f6e52;
            span {
              color: #704025;
            }
          }
        }

        & .title_question {
          width: 100%;
          & > h2 {
            font-size: ${fontSize["22"]};
            font-weight: ${fontWeight.extraBold};
            margin: 16px 0 24px 0;
            padding: 2px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
            ${device.mobile} {
              font-size: ${fontSize["18"]};
              margin: 16px 0;
            }
          }
        }
      }
    `;
  }}
`;

const ScrapIcon = styled(BsBookmark)`
  cursor: pointer;
  font-size: ${({ theme }) => theme.calRem(16)};
  color: ${({ theme }) => theme.colors.main};
  padding: 0;
`;

const ScrappedIcon = styled(BsFillBookmarkFill)`
  cursor: pointer;
  font-size: ${({ theme }) => theme.calRem(16)};
  color: ${({ theme }) => theme.colors.main};
  padding: 0;
`;

const HeartCheck = styled(BsHeartFill)`
  height: 100%;
  color: ${({ theme }) => theme.colors.pink};
  cursor: pointer;

  font-size: ${({ theme }) => theme.calRem(18)};
  padding: 0;
`;

const AuthorContainer = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSize } = theme;
    return css`
      width: 100%;

      & .author_box {
        border-bottom: 1px solid #edf0f5;
        flex-grow: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 10px 16px 10px;

        .author_date {
          display: flex;
          align-items: center;
          .createdAt {
            font-size: ${fontSize["12"]};
            color: ${colors.grey60};
          }
        }
        & .user_profile {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:hover {
            transform: scale(1.02);
          }
          & > span {
            font-size: ${fontSize["16"]};
            ${device.mobile} {
              font-size: ${fontSize["14"]};
            }
          }

          .line {
            font-weight: 800;
            color: #edf0f5;
            padding: 0 6px;
          }
        }

        & .button_wrap {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          object-fit: cover;

          button : {
            /* width: 10px;
      margin: 0 5px; */
          }
          span {
            font-size: ${({ theme }) => theme.fontSize["14"]};
          }
        }
      }

      & .author_note {
        font-size: ${({ theme }) => theme.calRem(14)};
        color: ${({ theme }) => theme.colors.grey90};
        margin: 24px 0;
        padding: 0 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        line-height: 1.2em;
      }
    `;
  }}
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 35px;
  height: 35px;
  margin-right: 5px;

  ${({ theme }) => theme.device.mobile} {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
`;

const CommentsContainer = styled.div`
  margin-top: 100px;
  padding: 0 10px;
`;

export default FeedBackDetail;
