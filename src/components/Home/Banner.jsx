import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import bannerBackground from "../../assets/bannerBackground.png";

const DUMMY_CONTENTS = [
  {
    badge: "윌비 소개",
    title: "화상면접 플랫폼 '윌비'를 소개합니다",
    content: "윌비는 당신의 성공과 함께합니다",
  },
  {
    badge: "이벤트",
    title: "윌비를 테스트 해보세요",
    content: "스벅커피 드려요~",
  },
  {
    badge: "공지",
    title: "무엇일까요?",
    content: "저도 몰라요~",
  },
];

const Banner = () => {
  const slider = useRef(null);

  const nextBtn = () => {
    slider.current.slickNext();
  };

  const prevBtn = () => {
    slider.current.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    slidesToShow: 1,
    fade: true,
    centerMode: false,
    centerPadding: "10px",
  };

  return (
    <BannerContainer>
      <StyledSlider ref={slider} {...settings}>
        {DUMMY_CONTENTS.map((ele, idx) => {
          const totalCount = DUMMY_CONTENTS.length;

          return (
            <div className="card" key={idx}>
              <div className="contents">
                <p className="badge">{ele.badge}</p>
                <h2 className="title">{ele.title}</h2>
                <p className="content">{ele.content}</p>
              </div>
              <div className="btnWrapper">
                <button onClick={prevBtn}>
                  <HiChevronLeft size="16px" />
                </button>
                <span>
                  <span style={{ color: "green" }}>{`${idx + 1}`}</span>
                  <span style={{ color: "rgba(0,0,0,0.3)" }}> / </span>
                  <span>{`${totalCount}`}</span>
                </span>
                <button onClick={nextBtn}>
                  <HiChevronRight size="16px" />
                </button>
              </div>
            </div>
          );
        })}
      </StyledSlider>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 60px;
  width: 100%;
  height: 300px;
  background-position: center;
  background-image: url(${bannerBackground});
  background-size: cover;
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 2px 5px rgba(130, 130, 130, 0.1);

  h2 {
    font-size: ${({ theme }) => theme.fontSize["20"]};
    word-break: break-all;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize["16"]};
  }
`;

const StyledSlider = styled(Slider)`
  .slick-list {
  }

  .slick-slide {
    display: flex !important;
    justify-content: flex-end;
  }

  .slick-arrow {
    display: none !important;
  }

  .slick-slide div {
    text-align: start;
    max-width: 400px;
    width: 100%;
    height: 250px;
  }

  .slick-slide div .card {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
    border-radius: 4px;
    border-start-start-radius: 30px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .badge {
    width: max-content;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    padding: 5px 12px;
    margin-bottom: 12px;
  }

  .title {
    margin-bottom: 20px;
    font-weight: bold;
  }

  .content {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }

  .btnWrapper {
    display: flex;
    align-items: center !important;
    height: max-content !important;
    font-size: ${({ theme }) => theme.fontSize["14"]};
    gap: 5px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid lightgray;
    border-radius: 50%;
    padding: 3px;
  }
`;

export default Banner;
