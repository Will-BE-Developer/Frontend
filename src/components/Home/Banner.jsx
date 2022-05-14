import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import bannerBackground from "../../assets/banner.png";

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
                  <span style={{ color: "black", fontSize: "16px" }}>{`${
                    idx + 1
                  }`}</span>
                  <span style={{ color: "rgba(0,0,0,0.3)" }}> / </span>
                  <span style={{ fontSize: "16px" }}>{`${totalCount}`}</span>
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
  align-items: center;
  width: 100%;
  height: 400px;
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

  .slick-slider {
    max-width: 1200px;
    width: 100%;
    ${({ theme }) => theme.device.tablet} {
      padding: 0px 1rem;
    }
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
    height: 300px;
  }

  .slick-slide div .card {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
    border-radius: 4px;
    border-start-start-radius: 30px;
    background-color: rgba(255, 255, 255, 0.4);
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
    /* background-color: white;
    border: 1px solid white;
     */
    /* background-color: rgba(255, 255, 255, 0.4); */
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    padding: 3px;
  }
`;

export default Banner;
