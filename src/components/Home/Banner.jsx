import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import bannerLogo from "../../assets/bannerLogo.svg";
import illust1 from "../../assets/illust1.gif";
import illust2 from "../../assets/illust2.gif";
import ReactGA from "react-ga";

const DUMMY_CONTENTS = [
  {
    badge: "윌비 소개",
    title: "화상면접 연습 커뮤니티 “Willbe”를 소개합니다.",
    content:
      "화상면접을 준비하면서 어려움을 겪고 계신가요? \n \n 윌비와 함께 하면 신입개발자도 면접준비 걱정 끝! \n \n  윌비와 함께 준비하세요😄",
  },
  {
    badge: "Event",
    title: "윌비의 주간 면접왕에 도전해보세요❤️‍🔥",
    content:
      "테스트 기간동안 주간 면접왕이 되신분들에게는 \n 상품을 드립니다 \n \n 면접왕에 들지 않아도 소정의 상품을 지급할 예정이오니 \n 여러분의 면접 기술을 뽐내고 상품도 받아가세요😉",
  },
];

const IMAGE_LIST = [illust1, illust2];

const Banner = () => {
  const [bannerImage, setBannerImage] = useState(illust1);
  const slider = useRef(null);
  const navigate = useNavigate();

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
    beforeChange: (_, newIdx) => setBannerImage(IMAGE_LIST[newIdx]),
  };

  return (
    <BannerContainer>
      <div className="contentsLayout">
        <div className="contentsWrapper">
          <img alt="bannerLogo" src={bannerLogo} />
          <StyledSlider ref={slider} {...settings}>
            {DUMMY_CONTENTS.map((ele, idx) => {
              const totalCount = DUMMY_CONTENTS.length;
              return (
                <div className="card" key={idx}>
                  <div className="contents">
                    <h2 className="title">{ele.title}</h2>
                    <p className="content">{ele.content}</p>
                    <button
                      className="link"
                      onClick={() => {
                        if (idx === 1) {
                          ReactGA.event({
                            category: "Banner",
                            action: "Go to the survey page",
                          });
                          window.open("https://forms.gle/3CCWq2KZ8d63qefm6");
                        } else {
                          ReactGA.event({
                            category: "Banner",
                            action: "Go to the interview recording page",
                          });
                          navigate("/interview");
                        }
                      }}
                    >
                      {idx === 1 ? "설문조사 바로가기" : "면접연습 하러가기"}
                      <HiChevronRight size="20px" />
                    </button>
                    <div className="btnWrapper">
                      <button onClick={prevBtn}>
                        <HiChevronLeft size="16px" />
                      </button>
                      <span>
                        <span>{`${idx + 1}`}</span>
                        <span> / </span>
                        <span>{`${totalCount}`}</span>
                      </span>
                      <button onClick={nextBtn}>
                        <HiChevronRight size="16px" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </StyledSlider>
        </div>
        <img
          style={{
            paddingRight: `${bannerImage === illust2 ? "100px" : "0px"}`,
          }}
          className="bannerImg"
          alt="bannerImage"
          src={bannerImage}
        />
      </div>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 420px;
  background-color: ${({ theme }) => theme.colors.mainHover};
  color: ${({ theme }) => theme.colors.white};

  .contentsLayout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 900px;
    width: 100%;
    overflow: hidden;
  }

  .bannerImg {
    height: 340px !important;
    margin: 0px !important;
    ${({ theme }) => theme.device.tablet} {
      padding: 0px 2rem;
    }

    @media screen and (max-width: 550px) {
      display: none;
    }
  }

  .contentsWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1000px;
    width: 100%;
    ${({ theme }) => theme.device.tablet} {
      padding: 0px 2rem;
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize["20"]};
    word-break: break-all;
  }
  @media screen and (max-width: 700px) {
    h2 {
      font-size: 18px;
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSize["16"]};
    white-space: pre-line;
  }

  img {
    height: 100px;
    max-width: max-content;
    width: 100%;
    margin-bottom: 2rem;
  }

  .slick-slider {
    max-width: 400px;
    width: 100%;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    pointer-events: none;
  }
  .slick-active {
    pointer-events: auto;
  }

  .slick-arrow {
    display: none !important;
  }

  .slick-slide div {
    text-align: start;
    max-width: 375px;
    width: 100%;
    height: 220px;
  }

  .slick-slide div .card {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start;
    color: ${({ theme }) => theme.colors.white};
  }

  .title {
    margin-bottom: 20px;
    font-weight: bold;
  }

  .content {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.mainHover};
    background-color: white;
    padding: 7px 10px 7px 20px;
    line-height: 0px;
    border-radius: 25px;
    box-shadow: 1px 2px 5px rgba(130, 130, 130, 0.2);
  }

  .btnWrapper {
    position: absolute;
    bottom: 0px;
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
    color: white;
    padding: 3px;
  }
`;

export default Banner;
