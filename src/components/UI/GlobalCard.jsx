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
    likesCount,
    createdAt,
    isMine,
    updatedAt,
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
      {/* <CardHeader>
        <div>
          <span>FRONTEND</span>
        </div>
      </CardHeader> */}

      <CardBody onClick={linkToDetailHandler}>
        <img alt="img" src={thumbnail} />
        <BodyContents>
          <h2>{question.contents}</h2>

          <span>{note}</span>
        </BodyContents>
        <p>{question.category}</p>
        <TimeAgo timestamp={createdAt} />
      </CardBody>

      <CardFooter>
        <div className="user_profile" onClick={showProfileHandler}>
          <ProfileImg src={user.profileImageUrl} />
          <BtnCircleBg>
            <CrownIcon />
          </BtnCircleBg>
          <span>{user.nickname}</span>
        </div>

        <IconBox>
          <div>
            <HeartCheck />
            <span>{likesCount}</span>
          </div>
          <div>
            <BeforeCheck />
            <span>{scrapsCount}</span>
          </div>
        </IconBox>
      </CardFooter>
    </Card>
  );
});

GlobalCard.defaultProps = {
  img_src: test_img,
};

const Card = styled.article`
  ${({ theme }) => {
    const { colors, device } = theme;
    return css`
      min-height: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      border-radius: 4px;
      background-color: ${colors.white};
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      &:hover {
        top: -2px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
      }
      transition: 1000ms eash-in-out;
    `;
  }}
`;

const CardHeader = styled.div`
  ${({ theme, bgColor }) => {
    const { colors, device, calRem } = theme;

    return css`
      flex-grow: 1;
      background: ${colors.white};
      width: 100%;
      background-size: cover;
      display: flex;
      justify-content: space-between;
      font-size: ${calRem(24)};
      color: ${colors.white};
      font-weight: 600;
      margin-bottom: 15px;

      // category box
      & div {
        background: ${colors.black};
        border-radius: 999px;
        width: 5.5rem;
        text-align: center;
        vertical-align: middle;
        height: 2rem;
      }
      // category text
      & > div > span {
        height: 2rem;
        font-size: ${calRem(12)};
        color: ${colors.white};
      }
    `;
  }}
`;

const CardBody = styled.div`
  flex-grow: 3;
  display: flex;
  padding: 20px;
  flex-direction: column;
  height: 70%;
  margin: 0 auto;
  width: 100%;
  cursor: pointer;
  // 날짜시간
  p {
    font-size: ${({ theme }) => theme.calRem(12)};
    margin-top: 10px;
  }
`;

const BodyContents = styled.div`
  flex-grow: 2;
  align-items: space-around;

  ${({ theme }) => {
    const { colors, device, calRem, fontWeight } = theme;
    return css`
      // Card question
      & > h2 {
        font-size: ${calRem(16)};
        font-weight: ${fontWeight.semiBold};
        padding-top: 0.5rem;
        margin: 10px 0;

        // 텍스트 자르기
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      }
      // Card content
      & > span {
        font-size: ${calRem(14)};

        // 텍스트 자르기
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        line-height: 1.2em;
        height: 3.6em;
      }
    `;
  }};
`;

const CardFooter = styled.div`
  border-top: 1px solid lightgrey;
  flex-grow: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 12px 20px 12px 20px;

  & .user_profile {
    cursor: pointer;
    &:hover {
      transform: scale(1.02);
    }
  }
  // user info
  & div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > span {
      font-size: ${({ theme }) => theme.calRem(12)};
    }
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

// like & scrap
const IconBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 4.5rem;
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

  font-size: ${({ theme }) => theme.calRem(18)};
  padding: 0;
`;
const HeartCheck = styled(BsHeartFill)`
  height: 100%;
  color: ${({ theme }) => theme.colors.yellow};

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

export default GlobalCard;
