import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import theme from "../../styles/theme";

import styled, { css } from "styled-components";
import GlobalButton from "../../components/UI/GlobalButton";

import {
  getFeedbackDetail as getDetailApi,
  getFeedbackDetailVideo as getVideoApi,
  deleteFeedbackDetail as deleteDetailApi,
  addScrap as addScrapApi,
  undoScrap as undoScrapApi,
} from "../../apis/feedbackApis.js";

import TimeAgo from "../../components/FeedBack/TimeAgo";

// react = icons
import { BsFillBookmarkFill, BsHeartFill } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import { AiTwotoneEdit, AiTwotoneCrown } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const FeedBackDetail = (props) => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState("");
  const [data, setData] = useState([]);
  const [isMine, setIsMine] = useState();
  const [isScrapped, setIsScrapped] = useState();
  const [scrapCount, setScrapCount] = useState();
  useEffect(() => {
    getVideoApi(cardId).then((data) => {
      setVideo(URL.createObjectURL(data));
    });
    getDetailApi(cardId).then((data) => {
      setData(data.interview);
      setIsScrapped(data.interview.scrapsMe);
      setScrapCount(data.interview.scrapsCount);
      setIsMine(data.interview.isMine);
    });
  }, [cardId]);

  const {
    id,
    thumbnail,
    question,
    user,
    badge,
    note,
    scrapsMe,
    scrapsCount,
    likesCount,
    createdAt,
    updatedAt,
    isPublic,
  } = data;

  const profileHandler = () => {
    alert("felfij");
    setShowModal(!showModal);
  };

  const editHandler = () => {
    navigate(`/feedback/update/${cardId}`, { state: { data, video } });
  };

  const clickDeleteHandler = () => {
    deleteDetailApi(cardId).then((data) => {
      if (data.interview.isPublic === true) {
        navigate(`/feedback/`, { replace: true });
      } else {
        navigate("/mypage/history", { replace: true });
      }
    });
  };

  const scrapHandler = () => {
    if (isScrapped === false) {
      addScrapApi(cardId).then((data) => {
        setIsScrapped(data.scrap.scrapsMe);
        setScrapCount(data.scrap.scrapsCount);
      });
    } else {
      undoScrapApi(cardId).then((data) => {
        setIsScrapped(data.scrap.scrapsMe);
        setScrapCount(data.scrap.scrapsCount);
      });
    }
  };

  return (
    <Container>
      <div className="contents_wrap">
        <div className="video_layout">
          <video controls src={video}></video>
        </div>
        {isMine && (
          <div className="user_buttons">
            <GlobalButton
              onClick={editHandler}
              background={theme.colors.white}
              color={theme.colors.black}
              border="1px solid rgba(130, 130, 130, 0.2)"
              text="수정"
              _width="64px"
              _height="36px"
            />
            <GlobalButton
              onClick={clickDeleteHandler}
              background={theme.colors.lightGrey}
              text="삭제"
              _width="64px"
              _height="36px"
              padding="9px 16px"
            />
          </div>
        )}

        <TitleContainer>
          <div className="title_box">
            <div className="category">{question?.category}</div>
            <div className="title_question">
              <h2>{question?.contents}</h2>
              <TimeAgo timestamp={createdAt} />
            </div>
          </div>

          <IconBox>
            <div>
              <button>
                <HeartCheck />
              </button>

              <span>{likesCount}</span>
            </div>
            <div>
              <button onClick={scrapHandler}>
                <BeforeCheck />
              </button>

              <span>{scrapCount} 개</span>
            </div>
          </IconBox>
        </TitleContainer>

        <AuthorContainer>
          <div className="author_box">
            <div className="user_profile" onClick={profileHandler}>
              <ProfileImg src={user?.profileImageUrl} />
              <BtnCircleBg>
                <CrownIcon />
              </BtnCircleBg>
              <span>{user?.nickname}</span>
            </div>
          </div>
          <span className="author_note">{note}</span>
        </AuthorContainer>
      </div>
    </Container>
  );
};

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

  video {
    max-width: 750px;
    width: 100%;
  }

  & .video_layout {
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.headerBgColor};
    border-radius: 6px;
    margin-bottom: 20px;
  }

  & .user_buttons {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
    margin-bottom: 40px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & .title_box {
    & .category {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #e6e6e6;
      border-radius: 999px;
      width: 87px;
      height: 24px;
      font-size: ${({ theme }) => theme.calRem(12)};
    }

    & .title_question {
      & > h2 {
        font-size: ${({ theme }) => theme.calRem(20)};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};

        margin: 12px 0;
        // 텍스트 자르기
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      }
    }
  }
`;

// like & scrap
const IconBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  object-fit: cover;
  vertical-align: middle;

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & div > span {
    margin: 0 5px;

    font-size: ${({ theme }) => theme.calRem(12)};
  }
`;

const BeforeCheck = styled(BsFillBookmarkFill)`
  /* font-size: 1rem; */
  height: 100%;
  color: ${({ theme }) => theme.colors.yellow};
  cursor: pointer;
  font-size: ${({ theme }) => theme.calRem(18)};
  padding: 0;
`;
const HeartCheck = styled(BsHeartFill)`
  height: 100%;
  color: ${({ theme }) => theme.colors.yellow};
  cursor: pointer;

  font-size: ${({ theme }) => theme.calRem(18)};
  padding: 0;
`;

const AfterCheck = styled(BsFillBookmarkFill)`
  /* font-size: 1.2rem; */
  height: 100%;
  vertical-align: middle;
  padding-bottom: 4px;
  color: ${({ theme }) => theme.colors.yellow};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
const HeartIcon = styled(AiOutlineHeart)`
  & svg {
    height: 100%;
  }

  cursor: pointer;
  color: "#686ef3";
`;

// btn

const Icons = css`
  vertical-align: middle;
  padding-bottom: 3px;

  color: ${({ theme }) => theme.colors.mediumGrey};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
`;

const Edit = styled(AiTwotoneEdit)`
  ${Icons}
`;
const Delete = styled(TiTimes)`
  ${Icons}
`;

// author

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

  // note
  & > span {
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

// btn
const BtnCircleBg = styled.button`
  width: 1.6em;
  height: 1.6em;
  padding: 0;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  ${({ theme }) => theme.device.tablet} {
    width: 1.2em;
    height: 1.2em;
    margin-right: 4px;
  }
`;

const CrownIcon = styled(AiTwotoneCrown)`
  height: 100%;
  color: ${({ theme }) => theme.colors.darkGrey};
  cursor: pointer;

  font-size: ${({ theme }) => theme.calRem(18)};
  padding: 0;
`;

export default FeedBackDetail;
