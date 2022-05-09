import styled, { css } from "styled-components";
import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bestUser from "../../assets/bestUser.png";

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
    slidesToScroll: 1,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "30px",
  };

  return (
    <BestInterviewsLayout>
      <StyledSlider ref={slider} {...settings}>
        {DUMMY_BEST_INTERVIEWS.map((ele, idx) => {
          return (
            <div className="card" key={idx}>
              <p>{idx}</p>
              <img src={ele.imageUrl} alt="user" />
            </div>
          );
        })}
      </StyledSlider>
    </BestInterviewsLayout>
  );
};

const BestInterviewsLayout = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  width: 100%;
  background-color: ${({ theme }) => theme.colors.headerBgColor};
  margin-bottom: 80px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    /* display: flex !important; */
  }

  .slick-slide div {
    max-width: 400px;
    width: 100%;
    height: 250px;
  }

  .slick-slide div .card {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    padding: 25px;
    border-radius: 4px;
    box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export default BestInterviews;
