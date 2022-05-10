import React, { useState } from "react";
import { memo } from "react";
import styled, { css } from "styled-components";

import { useNavigate, useParams } from "react-router-dom";

// react = icons
import { BsFillBookmarkFill, BsHeartFill } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import { AiTwotoneEdit, AiTwotoneCrown } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

// timeago function
import TimeAgo from "../FeedBack/TimeAgo";

import test_img from "../Signup/test_img.jpg";

const GlobalCard = memo(({ card }) => {
  const [showModal, setShowModal] = useState(false);
  const { cardId } = useParams();
  const navigate = useNavigate();

  const {
    id,
    thumbnail,
    question,
    user,
    badge,
    note,
    scrapsMe,
    scrapsCount,
    createdAt,
    isMine,
    isPublic,
  } = card;

  const linkToDetailHandler = () => {
    navigate(`/feedback/${id}`, { cardId });
  };

  const showProfileHandler = () => {
    alert("felfij");
    setShowModal(!showModal);
  };

  return (
    <Card>
      <CardBody onClick={linkToDetailHandler}>
        <img alt="img" src={thumbnail} />
        <BodyContainer>
          <div className="contents">
            <div className="top">
              <h2>{question.contents}</h2>
              <span>{note}</span>
            </div>
            <div className="bottom">
              <p>{question.category}</p>
              <div className="date_comments">
                <TimeAgo timestamp={createdAt} />
                <span>· 3개의 댓글</span>
              </div>
            </div>
          </div>
        </BodyContainer>
      </CardBody>

      <CardFooter>
        <div className="user_container" onClick={showProfileHandler}>
          <ProfileImg src={user.profileImageUrl} />
          <span>by {user.nickname}</span>
        </div>
        <div className="icon_container">
          <ScrapButton isScrapped={scrapsMe} />
          <span>{scrapsCount}</span>
        </div>
      </CardFooter>
    </Card>
  );
});

GlobalCard.defaultProps = {
  img_src: test_img,
};

// 면접왕 아이콘 (추후 추가할 수 있음)
//  <BtnCircleBg>
//    <CrownIcon />
//  </BtnCircleBg>

const Card = styled.article`
  ${({ theme }) => {
    const { colors, device } = theme;
    return css`
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      border-radius: 4px;
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
      transition: 1000ms eash-in-out;
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
`;

const BodyContainer = styled.div`
  ${({ theme }) => {
    const { colors, device, calRem, fontWeight } = theme;
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

        h2 {
          font-size: ${calRem(16)};
          font-weight: ${fontWeight.extraBold};
          margin-bottom: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-wrap: break-word;
        }

        span {
          font-size: ${calRem(14)};
          margin-bottom: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          word-wrap: break-word;
          line-height: 1.2em;
          height: 3.6em;
        }
      }

      & .contents .bottom {
        padding: 0;

        p {
          margin-bottom: 5px;
        }
        & .date_comments {
          display: flex;
          font-size: ${calRem(12)};

          & > span {
            margin-right: 5px;
          }
        }
      }
    `;
  }}
`;

const CardFooter = styled.div`
  border-top: 1px solid lightgrey;
  flex-grow: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px 12px 20px;

  & .user_container {
    cursor: pointer;
    &:hover {
      transform: scale(1.02);
    }

    span {
      font-size: ${({ theme }) => theme.calRem(12)};
    }
  }

  & .icon_container {
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    span {
      margin-left: 8px;
      font-size: ${({ theme }) => theme.calRem(12)};
    }
  }
  & div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const ScrapButton = styled(BsFillBookmarkFill)`
  ${({ isScrapped, theme }) => {
    return css`
      height: 100%;
      color: ${isScrapped ? theme.colors.yellow : theme.colors.lightGrey};
      cursor: pointer;
      font-size: ${({ theme }) => theme.calRem(18)};
      padding: 0;
    `;
  }}
`;

export default GlobalCard;
