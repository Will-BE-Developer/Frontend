import styled, { css } from "styled-components";
import Slider from "react-slick";
import { useRef } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bestUser from "../../assets/bestUser.png";
import GlobalBadge from "../UI/GlobalBadge";
import theme from "../../styles/theme";

const DUMMY_BEST_INTERVIEWS = [
  {
    imageUrl: bestUser,
    title: "5월 첫째주 면접왕 1등 '김일등'",
    description: "좋아요를 가장 많이 받은 순위로 추려졌습니다",
    question: "Q.Recoil의 장점에 대해서 말해주세요",
    badge: "FRONTEND",
    rank: "1",
  },
  {
    imageUrl: bestUser,
    title: "5월 첫째주 면접왕 2등 '김이등'",
    description: "좋아요를 가장 많이 받은 순위로 추려졌습니다",
    question: "Q.Recoil의 장점에 대해서 말해주세요",
    badge: "FRONTEND",
    rank: "2",
  },
  {
    imageUrl: bestUser,
    title: "5월 첫째주 면접왕 3등 '김삼등'",
    description: "좋아요를 가장 많이 받은 순위로 추려졌습니다",
    question: "Q.Recoil의 장점에 대해서 말해주세요",
    badge: "FRONTEND",
    rank: "3",
  },
];

const BestInterviews = () => {
  const slider = useRef(null);

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
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          fontSize: theme.fontSize["20"],
          fontWeight: theme.fontWeight.extraBold,
          marginBottom: "20px",
        }}
      >
        주간 면접왕
      </h2>
      <BestInterviewsLayout>
        <div className="background" />
        <div className="btnWrapper">
          <button onClick={prevBtn}>
            <HiChevronLeft size="20px" />
          </button>
        </div>
        <StyledSlider ref={slider} {...settings}>
          {DUMMY_BEST_INTERVIEWS.map((ele, idx) => {
            return (
              // <section key={idx}>
              //   <div className="header">
              //     <h2 className="title">{ele.title}</h2>
              //     <p className="description">{ele.description}</p>
              //   </div>
              <div key={idx} className="main">
                <div className="card" key={idx}>
                  <img className="thumbnail" src={ele.imageUrl} alt="user" />
                  <div className="interview">
                    <h2 className="title">{ele.title}</h2>
                    <GlobalBadge
                      background={theme.colors.pink}
                      text={ele.badge}
                    />
                    {/* <p className="description">{ele.description}</p> */}
                    <span className="question">{ele.question}</span>
                  </div>
                </div>
              </div>
              // </section>
            );
          })}
        </StyledSlider>
        <div className="btnWrapper">
          <button onClick={nextBtn}>
            <HiChevronRight size="20px" />
          </button>
        </div>
      </BestInterviewsLayout>
    </div>
  );
};

const BestInterviewsLayout = styled.div`
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

      .title {
        font-size: ${fontSize["20"]};
        font-weight: ${fontWeight.extraBold};
        margin-bottom: 30px;
      }

      .question {
        margin-top: 12px;
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
    `;
  }}
`;

export default BestInterviews;
