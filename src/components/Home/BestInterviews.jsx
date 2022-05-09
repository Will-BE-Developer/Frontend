import styled, { css } from "styled-components";
import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bestUser from "../../assets/bestUser.png";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

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
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "60px",
  };

  return (
    <BestInterviewsLayout>
      <StyledSlider ref={slider} {...settings}>
        {DUMMY_BEST_INTERVIEWS.map((ele, idx) => {
          return (
            <div className="card" key={idx}>
              <p>{idx}</p>
              <img className="thumbnail" src={ele.imageUrl} alt="user" />
              <div className="btnWrapper">
                <button onClick={prevBtn}>
                  <HiChevronLeft size="16px" />
                </button>
                <button onClick={nextBtn}>
                  <HiChevronRight size="16px" />
                </button>
              </div>
            </div>
          );
        })}
      </StyledSlider>
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
  margin-bottom: 80px;

  .slick-slider {
    width: 100% !important;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    /* display: flex !important; */
  }

  .slick-slide div {
    max-width: 1200px;
    width: 100%;
  }

  .slick-slide div .card {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    padding: 25px;
    border-radius: 4px;
  }
`;

export default BestInterviews;
