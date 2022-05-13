import styled, { css } from "styled-components";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bestUser from "../../assets/bestUser.png";
import GlobalBadge from "../UI/GlobalBadge";
import theme from "../../styles/theme";
import gold from "../../assets/icons/gold.png";
import silver from "../../assets/icons/silver.png";
import bronze from "../../assets/icons/bronze.png";

const BestInterviews = ({ weeklyInterviews }) => {
  const navigate = useNavigate();
  const slider = useRef(null);
  const [title, setTitle] = useState(
    `5월 둘째주 면접왕 1등 '${weeklyInterviews[0].user.nickname}'`
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
          weeklyInterviews[newIdx].user.nickname
        }'`
      ),
  };

  return (
    <BestInterviewsLayout>
      <h2 className="title">{title}</h2>
      <SliderLayout>
        <div className="background" />
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
                  <img className="thumbnail" src={bestUser} alt="user" />
                  <div className="interview">
                    <img className="badge" alt="badge" src={badgeIcon[idx]} />
                    <GlobalBadge
                      background={theme.colors.pink}
                      text={interview.question.category}
                    />
                    <span className="question">
                      {interview.question.contents}
                    </span>
                    <button
                      onClick={() => navigate(`/feedback/${interview.id}`)}
                      className="interviewBtn"
                    >
                      피드백 보러가기
                    </button>
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

  & .title {
    text-align: "center";
    font-size: ${theme.fontSize["20"]};
    font-weight: ${theme.fontWeight.extraBold};
    margin-bottom: "20px";
    @media screen and (max-width: 700px) {
      margin-bottom: 40px;
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
    right: 0;
    width: 60%;
    height: 350px;
    z-index: -1;
    background-color: ${({ theme }) => theme.colors.headerBgColor};
    border-start-start-radius: 50px;

    @media screen and (max-width: 700px) {
      height: 450px;
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
          bottom: -30px;
        }
      }

      .slick- .slick-dots li button::before {
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
          width: 100%;
          text-align: center;
        }
      }

      .interview {
        max-width: 350px !important;
        width: 50% !important;
        display: flex;
        justify-content: center !important;
        align-items: center !important;
        @media screen and (max-width: 700px) {
          width: 100%;
          text-align: center;
        }
      }

      .badge {
        margin-bottom: 10px;
      }

      .interviewBtn {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        color: ${({ theme }) => theme.colors.black};
        border: 1px solid ${({ theme }) => theme.colors.darkGrey};
        border-radius: 25px;
      }
    `;
  }}
`;

export default BestInterviews;
