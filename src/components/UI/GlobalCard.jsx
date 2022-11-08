import { useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactGA from "react-ga";

import TimeAgo from "../FeedBack/TimeAgo";
import UserProfileModal from "../UI/ModalSample/UserProfileModal";

import theme from "../../styles/theme";
import styled, { css } from "styled-components";
import defaultUserImage from "../../assets/defaultUserImage.png";
import convertingImg from "../../assets/convertingImageM.svg";
import { BsFillBookmarkFill } from "react-icons/bs";

const GlobalCard = memo(({ card }) => {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const { cardId } = useParams();
  const navigate = useNavigate();
  const {
    id,
    thumbnail,
    question,
    user,
    note,
    scrapsMe,
    scrapsCount,
    createdAt,
    isMine,
    commentsCount,
  } = card;

  const sendProfileModalHandler = (boolean) => {
    setOpenProfileModal(boolean);
  };

  const linkToDetailHandler = () => {
    ReactGA.event({
      category: "Feedback",
      action: "Click Card to detail",
    });
    navigate(`/feedback/${id}`, { cardId });
  };

  return (
    <Card>
      <UserProfileModal
        img={user?.profileImageUrl}
        nickname={user?.nickname}
        githubLink={user?.githubLink}
        introduce={user?.introduce}
        setOpenProfileModal={sendProfileModalHandler}
        openProfileModal={openProfileModal}
        isMine={isMine}
      />
      <CardBody onClick={linkToDetailHandler}>
        {thumbnail === null ? (
          <div className="converting_img">
            <Img alt="img" src={convertingImg} />
          </div>
        ) : (
          <Img alt="img" src={thumbnail} />
        )}

        <BodyContainer>
          <div className="contents">
            <div className="top">
              <div className="category_name">
                <span className="category">{question.category} </span>
                <span className="spot">·</span>
                <span className="nickname">{user.nickname}</span>
              </div>
              <div className="question_box">
                <h2>{question.contents}</h2>
                <span>{note}</span>
              </div>
            </div>
          </div>
        </BodyContainer>
      </CardBody>

      <CardFooter>
        <div className="date_feedback_cnt">
          <TimeAgo timestamp={createdAt} />
          <span className="spot">·</span>
          <span>{commentsCount}개의 피드백</span>
        </div>
        <div className="icon_container">
          <div
            style={{
              color: scrapsMe ? theme.colors.like : "#C2C7D0",
            }}
          >
            <ScrapIcon />
          </div>
          <span>{scrapsCount}</span>
        </div>
      </CardFooter>
    </Card>
  );
});

GlobalCard.defaultProps = {
  img_src: defaultUserImage,
};

const Img = styled.img`
  ${({ theme }) => theme.device.mobile} {
    height: 240px;
  }
  height: 240px;
`;
const Card = styled.article`
  ${({ theme }) => {
    const { colors, device } = theme;
    return css`
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      border-radius: 12px;
      background-color: ${colors.white};
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      &:hover {
        transform: translateY(-8px);
        box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
        transition-property: box-shadow, transform;
        transition-duration: 0.25s, 0.25s;
        transition-timing-function: ease-in, ease-in;
        transition-delay: 0s, 0s;
      }
      transition: 1000ms ease-in-out;

      ${device.mobile} {
      }
    `;
  }}
`;

const CardBody = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  cursor: pointer;
  .converting_img {
    display: flex;
    justify-content: center;
    background: ${({ theme }) => theme.colors.grey5};
  }
`;

const BodyContainer = styled.div`
  ${({ theme }) => {
    const { calRem, fontWeight, colors, fontSize } = theme;
    return css`
      padding: 20px;
      & .contents {
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
        justify-content: space-between;
      }

      & .contents .top {
        display: block;
        & .category_name {
          display: flex;
          gap: 3px;
          font-size: ${fontSize["12"]};
          .category {
            color: ${colors.main};
          }
          .spot {
            font-size: ${fontSize["14"]};
            font-weight: ${fontWeight.extraBold};
          }
          .nickname {
            color: ${colors.grey70};
          }
        }
        & .question_box {
          margin: 8px 0 30px 0;
          h2 {
            font-size: ${fontSize["16"]};
            font-weight: ${fontWeight.extraBold};
            margin-bottom: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 1.2em;
            word-wrap: break-word;
          }

          span {
            font-size: ${calRem(14)};
            margin-bottom: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
            line-height: 1.2em;
            height: 2.4em;
          }
        }
      }
    `;
  }}
`;

const CardFooter = styled.div`
  ${({ theme }) => {
    const { colors, fontSize } = theme;
    return css`
      border-top: 1px solid #f4f6f9;
      flex-grow: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px 12px 20px;

      & .date_feedback_cnt {
        gap: 5px;
        color: ${colors.grey60};
        span {
          font-size: ${fontSize["12"]};
        }
      }

      & .icon_container {
        display: flex;
        -webkit-box-align: center;
        align-items: center;

        span {
          margin-left: 8px;
          color: ${colors.grey60};
          font-size: ${fontSize["12"]};
        }
      }
      & div:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }}
`;

const ScrapIcon = styled(BsFillBookmarkFill)`
  ${({ theme }) => {
    return css`
      height: 100%;
      font-size: ${theme.calRem(18)};
      padding: 0;
    `;
  }}
`;

export default GlobalCard;
