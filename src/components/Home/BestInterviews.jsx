import styled, { css } from "styled-components";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from "../../styles/theme";
import gold from "../../assets/icons/gold.png";
import silver from "../../assets/icons/silver.png";
import bronze from "../../assets/icons/bronze.png";

const BestInterviews = ({ weeklyInterviews }) => {
  const navigate = useNavigate();
  const slider = useRef(null);
  const [title, setTitle] = useState(
    `5월 둘째주 면접왕 1등 '${weeklyInterviews[0]?.user?.nickname}'`
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
        `5월 둘째주 면접왕 ${Number(newIdx) + 1}등 '${
          weeklyInterviews[newIdx]?.user?.nickname
        }'`
      ),
  };

  return (
    <BestInterviewsLayout>
      <div className="titleWrapper">
        <h2 className="tile">{title}</h2>
        <h3 className="subTitle">인터뷰 영상을 확인해보세요</h3>
      </div>
      <SliderLayout>
        <div className="background">
          {/* <div className="leftCircle"></div> */}
          {/* <div className="rightCircle"></div> */}
        </div>
        <div className="btnWrapper">
          <button onClick={prevBtn}>
            <HiChevronLeft size="20px" />
          </button>
        </div>
        <StyledSlider ref={slider} {...settings}>
          {weeklyInterviews.map((interview, idx) => {
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
                      <span style={{ fontSize: theme.fontSize["14"] }}>
                        누적 스크랩
                        <span style={{ color: theme.colors.blue }}>9999+</span>
                        개 달성!
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
                        onClick={() => navigate(`/feedback/${interview.id}`)}
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
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
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
    }
  }

  .rightCircle {
    position: absolute;
    right: 250px;
    bottom: -60px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    /* background-color: #eab90d; */
    background-color: #567fe8;
    z-index: -1;

    @media screen and (max-width: 700px) {
      right: 100px;
    }
  }

  .leftCircle {
    position: absolute;
    left: 300px;
    top: -95px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #567fe8;
    z-index: -1;
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
          bottom: -30px;
        }
      }

      .slick-dots .slick-dots li button::before {
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
