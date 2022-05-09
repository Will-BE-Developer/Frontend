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
    className: "center",
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    // centerMode: true,
    // centerPadding: "60px",
    // fade: true,
  };

  return (
    <BestInterviewsLayout>
      <div className="btnWrapper">
        <button onClick={prevBtn}>
          <HiChevronLeft size="20px" />
        </button>
      </div>
      {/* <div className="header">
                <h2 className="title">{ele.title}</h2>
                <p className="description">{ele.description}</p>
              </div> */}
      <StyledSlider ref={slider} {...settings}>
        {DUMMY_BEST_INTERVIEWS.map((ele, idx) => {
          return (
            <div key={idx} className="main">
              <div className="card" key={idx}>
                <img className="thumbnail" src={ele.imageUrl} alt="user" />
                <div className="interview">
                  <h2 className="title">{ele.title}</h2>
                  <p className="description">{ele.description}</p>
                  <span>{ele.rank}</span>
                  <GlobalBadge
                    background={theme.colors.pink}
                    text={ele.badge}
                  />
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
    </BestInterviewsLayout>
  );
};

const BestInterviewsLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.headerBgColor};
  margin-bottom: 140px;
  border-radius: 4px;

  .slick-slider {
    max-width: 800px;
    width: 100% !important;
  }
`;

const StyledSlider = styled(Slider)`
  ${({ theme }) => {
    const { fontSize, colors, fontWeight } = theme;

    return css`
      .slick-arrow {
        display: none !important;
      }

      .slick-dots {
        bottom: -20px;
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
        max-width: 800px;
      }

      .slick-slide div .card {
        display: flex !important;
        max-width: 800px;
        width: 100%;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
        padding: 25px;
      }

      .header {
        margin-bottom: 30px;
      }

      .title {
        font-size: ${fontSize["20"]};
        font-weight: ${fontWeight.extraBold};
        margin-bottom: 12px;
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
        width: 100%;
      }

      .interview {
        max-width: 350px !important;
        width: 100% !important;
        display: flex;
        justify-content: center !important;
        align-items: center !important;
      }
    `;
  }}
`;

export default BestInterviews;
