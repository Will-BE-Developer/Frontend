import styled, { css } from "styled-components";
import ReactGA from "react-ga";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GlobalButton from "../UI/GlobalButton";
import theme from "../../styles/theme";
import gold from "../../assets/icons/gold.png";
import silver from "../../assets/icons/silver.png";
import bronze from "../../assets/icons/bronze.png";

const BestInterviews = ({ weeklyInterviews }) => {
  const navigate = useNavigate();
  const slider = useRef(null);
  const isEmpty = weeklyInterviews.length === 0;
  const [title, setTitle] = useState(
    isEmpty
      ? "현재 면접왕이 없습니다."
      : `${weeklyInterviews[0]?.badge} '${weeklyInterviews[0]?.user?.nickname}' 님`
  );
  const badgeIcon = [gold, silver, bronze];

  const nextBtn = () => {
    slider.current.slickNext();
  };

  const prevBtn = () => {
    slider.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    beforeChange: (_, newIdx) =>
      setTitle(
        isEmpty
          ? "현재 면접왕이 없습니다"
          : `${weeklyInterviews[newIdx]?.badge} '${weeklyInterviews[newIdx]?.user?.nickname}' 님`
      ),
  };

  return (
    <BestInterviewsLayout>
      <div className="titleWrapper">
        <h2 className="tile">{title}</h2>
        <h3 className="subTitle">
          {isEmpty ? "면접왕에 도전해보세요" : "인터뷰 영상을 확인해보세요"}
        </h3>
      </div>
      {isEmpty ? (
        <GlobalButton
          radius="25px"
          margin="30px 0px 0px 0px"
          hover={({ theme }) => theme.colors.grey5}
          background={theme.colors.white}
          color={theme.colors.black}
          border="1px solid rgba(130, 130, 130, 0.2)"
          onClick={() => navigate("/interview")}
        >
          면접 보러가기
          <HiChevronRight size="25px" color={theme.colors.grey50} />
        </GlobalButton>
      ) : (
        <SliderLayout>
          <div className="background" />
          <div className="btnWrapper">
            <button onClick={prevBtn}>
              <HiChevronLeft size="20px" />
            </button>
          </div>
          <StyledSlider ref={slider} {...settings}>
            {weeklyInterviews.map((interview, idx) => {
              if (idx >= 3) {
                return null;
              }

              return (
                <div key={interview.id} className="main">
                  <div className="card">
                    <img
                      className="thumbnail"
                      src={interview.thumbnail}
                      alt="user"
                    />
                    <div className="interview">
                      <div className="header">
                        <span
                          style={{
                            fontSize: "18px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {interview.user?.nickname}님
                          <img src={badgeIcon[idx]} alt="badge" />
                        </span>
                      </div>
                      <div className="hr" />
                      <div className="interviewContents">
                        <span className="interviewTopic">
                          {interview.question.category}
                        </span>
                        <span className="question">
                          Q. {interview.question.contents}
                        </span>
                      </div>
                      <div className="feedbackBtn">
                        <button
                          onClick={() => {
                            navigate(`/feedback/${interview.id}`);
                            ReactGA.event({
                              category: "BestInterview",
                              action: "Go to the interview detail page",
                            });
                          }}
                          className="interviewBtn"
                        >
                          영상 보러가기
                          <HiChevronRight size="25px" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </StyledSlider>
          <div className="btnWrapper">
            <button onClick={nextBtn}>
              <HiChevronRight size="20px" />
            </button>
          </div>
        </SliderLayout>
      )}
    </BestInterviewsLayout>
  );
};

const BestInterviewsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .titleWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: ${theme.fontSize["20"]};
    font-weight: ${theme.fontWeight.extraBold};
    margin-bottom: "25px";
    @media screen and (max-width: 700px) {
      margin-bottom: 50px;
    }
    h3 {
      margin-top: 8px;
      font-size: ${theme.fontSize["14"]};
      color: ${theme.colors.mediumGrey};
    }
  }
`;

const SliderLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  margin-bottom: 140px;
  border-radius: 4px;
  position: relative;
  @media screen and (max-width: 700px) {
    padding: 0px 2rem;
  }

  .btnWrapper button {
    display: flex;
    padding: 0px;
    border: 1px solid white;
    background-color: white;
    border-radius: 50%;
    box-shadow: 1px 2px 5px rgba(133, 133, 133, 0.2);
  }

  .background {
    position: absolute;
    overflow: hidden;
    right: 0;
    width: 60%;
    height: 350px;
    z-index: -2;
    background-color: ${({ theme }) => theme.colors.headerBgColor};
    border-start-start-radius: 50px;

    @media screen and (max-width: 700px) {
      height: 470px;
      width: 100%;
      border-start-start-radius: 0px;
    }
  }

  .slick-slider {
    max-width: 800px;
    width: 90% !important;
  }
`;

const StyledSlider = styled(Slider)`
  ${({ theme }) => {
    const { fontSize, colors, fontWeight } = theme;

    return css`
      .slick-list {
        overflow: hidden;
      }

      .slick-arrow {
        display: none !important;
      }

      .slick-dots {
        bottom: -60px;
        @media screen and (max-width: 700px) {
          bottom: -50px;
        }
      }

      .slick-dots li button::before {
        color: #c4c4c4;
      }

      .slick-dots li button:active {
        color: #c4c4c4;
      }

      .slick-dots li.slick-active button::before {
        color: #3771d3;
      }

      .slick-slide {
        display: flex !important;
        justify-content: center;
      }

      .slick-slide div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .slick-slide div .card {
        display: flex !important;
        width: 100%;
        height: 100%;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
        padding: 25px;

        @media screen and (max-width: 700px) {
          flex-direction: column;
        }
      }

      .question {
        margin-top: 10px;
        font-weight: ${fontWeight.extraBold};
        text-align: start;
      }

      .description {
        font-size: ${fontSize["14"]};
        color: ${colors.lightGrey};
      }

      .main {
        display: flex !important;
        flex-direction: row !important;
      }

      .thumbnail {
        max-width: 350px;
        height: 240px;
        width: 50%;
        border-radius: 8px;
        @media screen and (max-width: 700px) {
          width: 100% !important;
          text-align: center;
        }
      }

      .interview {
        max-width: 350px !important;
        width: 50% !important;
        height: 100%;
        padding: 10px 15px;
        display: flex;
        justify-content: start !important;
        align-items: center !important;
        @media screen and (max-width: 700px) {
          width: 100% !important;
          text-align: center;
        }
      }

      .header {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: center !important;
      }

      .hr {
        margin: 10px 0px;
        height: 1px;
        background: rgba(0, 0, 0, 0.1);
      }

      .interviewBtn {
        padding: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${theme.colors.mediumGrey};
        font-size: 15px;
        line-height: 0px;
      }

      .interviewTopic {
        color: ${theme.colors.blue};
      }

      .interviewContents {
        display: flex !important;
        align-items: flex-start !important;
        margin-top: 20px;
      }

      .feedbackBtn {
        width: 100%;
        display: flex !important;
        align-items: flex-start !important;
        margin-top: 20px;
      }
    `;
  }}
`;

export default BestInterviews;
