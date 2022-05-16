import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import theme from "../../styles/theme";
import styled, { css } from "styled-components";
import GlobalButton from "../../components/UI/GlobalButton";
import { BsFillBookmarkFill, BsHeartFill } from "react-icons/bs";
import { IoAlertCircle } from "react-icons/io5";

import GlobalModal from "../../components/UI/GlobalModal";
import UserProfileModal from "../../components/UI/ModalSample/UserProfileModal";
import GlobalBadge from "../../components/UI/GlobalBadge";
import feedbackApis from "../../apis/feedbackApis.js";
import TimeAgo from "../../components/FeedBack/TimeAgo";
import Comments from "../../components/Comments/Comments";
import Video from "../../components/Video/Video";

import Gold from "../../assets/icons/gold.png";
import Silver from "../../assets/icons/silver.png";
import Bronze from "../../assets/icons/bronze.png";

const FeedBackDetail = (props) => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [video, setVideo] = useState("");
  const [data, setData] = useState([]);
  const [isMine, setIsMine] = useState();
  const [isScrapped, setIsScrapped] = useState();
  const [scrapCount, setScrapCount] = useState();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [cardBadge, setCardBadge] = useState("");
  const sendProfileModalHandler = (boolean) => {
    setOpenProfileModal(boolean);
  };

  const badgeIcon = [Gold, Silver, Bronze];
  let badge;
  if (cardBadge === "Gold") {
    badge = badgeIcon[0];
  }
  if (cardBadge === "Silver") {
    badge = badgeIcon[1];
  }
  if (cardBadge === "Bronze") {
    badge = badgeIcon[2];
  }

  useEffect(() => {
    feedbackApis
      .getDetailVideo(cardId)
      .then((data) => {
        console.log(data);
        // setVideo(URL.createObjectURL(data));
        setVideo(URL.createObjectURL(data));
      })
      .catch(() => {
        navigate("/notFound");
        return;
      });

    feedbackApis
      .getDetail(cardId)
      .then((data) => {
        setData(data.interview);
        setIsScrapped(data.interview.scrapsMe);
        setScrapCount(data.interview.scrapsCount);
        setIsMine(data.interview.isMine);
        setCardBadge(data.interview.badge);
      })
      .catch((err) => {
        console.log(err);
        navigate("/notFound");
        return;
      });
  }, [cardId, navigate]);

  const {
    id,
    thumbnail,
    question,
    user,
    note,
    scrapsMe,
    scrapsCount,
    likesCount,
    commentsCount,
    createdAt,
    updatedAt,
    isPublic,
  } = data;

  const editHandler = () => {
    navigate(`/feedback/${cardId}/update`, { state: { data, video } });
  };

  const clickDeleteHandler = () => {
    feedbackApis.deleteDetail(cardId).then((data) => {
      if (data.interview?.isPublic === true) {
        navigate(`/feedback/`, { replace: true });
      } else {
        navigate("/mypage/history", { replace: true });
      }
    });
  };

  const scrapHandler = () => {
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

        <div className="contents_wrap">
          {/* <div className="video_layout"> */}
          <Video cardId={cardId} />
          {/* </div> */}
          {isMine && (
            <div className="user_buttons">
              <GlobalButton
                text="수정"
                background={theme.colors.white}
                color={theme.colors.black}
                border="1px solid rgba(130, 130, 130, 0.2)"
                _height="40px"
                onClick={editHandler}
              />
              <GlobalButton
                margin="0px 10px 0px 0px"
                background={theme.colors.blue}
                border="1px solid rgba(130, 130, 130, 0.2)"
                _height="40px"
                onClick={() => setOpenDeleteModal(true)}
                text="삭제"
              />
            </div>
          )}

          <TitleContainer>
            <div className="title_box">
              <div className="catetory_box">
                {cardBadge !== "NONE" && (
                  <img className="badge" alt="badge" src={badge} />
                )}
                <span className="category">{question?.category}</span>
              </div>

              <div className="title_question">
                <h2>{`Q.${question?.contents}`}</h2>
                <TimeAgo timestamp={createdAt} />
              </div>
            </div>

            <div className="icon_container">
              <div className="button_wrap">
                <button>
                  <HeartCheck />
                </button>

                <span>{likesCount}</span>
              </div>
              <div className="button_wrap">
                <button
                  style={{
                    color: isScrapped
                      ? theme.colors.pink
                      : theme.colors.lightGrey,
                  }}
                  onClick={scrapHandler}
                >
                  <ScrapIcon />
                </button>
                <span>{scrapCount}</span>
              </div>
            </div>
          </TitleContainer>

          <AuthorContainer>
            <div className="author_box">
              <div
                className="user_profile"
                onClick={() => setOpenProfileModal(true)}
              >
                <ProfileImg src={user?.profileImageUrl} />
                <span>{user?.nickname}</span>
              </div>
            </div>
            <span className="author_note">{note}</span>
          </AuthorContainer>

          <CommentsContainer>
            <Comments cardId={cardId} />
          </CommentsContainer>
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
    margin-bottom: 40px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & .title_box {
    & .catetory_box {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    & .catetory_box .category {
      font-size: ${({ theme }) => theme.fontSize["12"]};
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.blue};
      border-radius: 15px;
      padding: 5px 12px;
    }

    & .title_question {
      & > h2 {
        font-size: ${({ theme }) => theme.fontSize["20"]};
        font-weight: ${({ theme }) => theme.fontWeight.extraBold};

        margin: 18px 0 8px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      }
    }
  }

  & .icon_container {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    object-fit: cover;
    & .button_wrap {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin: 0 5px;
      button : {
        width: 10px;
        margin: 0 5px;
      }
      span {
        font-size: ${({ theme }) => theme.calRem(12)};
      }
    }
  }
`;

const ScrapIcon = styled(BsFillBookmarkFill)`
  height: 100%;
  cursor: pointer;
  font-size: ${({ theme }) => theme.calRem(18)};
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
  width: 100%;
  & .author_box {
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    flex-grow: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding: 12px 0;

    & .user_profile {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        transform: scale(1.02);
      }
      & > span {
        font-size: ${({ theme }) => theme.calRem(12)};
      }
    }
  }
  & .author_note {
    font-size: ${({ theme }) => theme.calRem(14)};
    margin: 20px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.2em;
  }
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const CommentsContainer = styled.div`
  margin-top: 100px;
`;

// 면접왕 아이콘
// const BtnCircleBg = styled.button`
//   width: 1.6em;
//   height: 1.6em;
//   padding: 0;
//   margin-right: 6px;
//   border-radius: 50%;
//   background-color: ${({ theme }) => theme.colors.lightGrey};
//   ${({ theme }) => theme.device.tablet} {
//     width: 1.2em;
//     height: 1.2em;
//     margin-right: 4px;
//   }
// `;

// const CrownIcon = styled(AiTwotoneCrown)`
//   height: 100%;
//   color: ${({ theme }) => theme.colors.darkGrey};
//   cursor: pointer;

//   font-size: ${({ theme }) => theme.calRem(18)};
//   padding: 0;
// `;

export default FeedBackDetail;
