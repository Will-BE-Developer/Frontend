import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import footerBanner from "../../assets/footerBanner.png";
import theme from "../../styles/theme";
import { HiChevronRight } from "react-icons/hi";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterLayout>
      <div className="background">
        <div className="contents">
          <div>
            <p>다른 유저들과 면접 영상을 공유하고</p>
            <p>자신만의 노하우로 주간 면접왕에 도전해보세요</p>
          </div>
          <button
            onClick={() => navigate("/interview")}
            className="interviewBtn"
          >
            면접 보러가기 <HiChevronRight size="25px" />
          </button>
        </div>
      </div>

      <div className="serviceWrapper">
        <div className="service">
          <a
            href="https://forms.gle/3CCWq2KZ8d63qefm6"
            target="_blank"
            rel="noreferrer noopener"
          >
            설문조사하기
          </a>
          <p className="company">윌비와 함께 준비하세요😎</p>
        </div>
      </div>
    </FooterLayout>
  );
};

const FooterLayout = styled.div`
  width: 100%;

  .background {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 140px;
    background-position: center;
    background-image: url(${footerBanner});
    background-size: cover;
  }

  .contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    color: #fff;

    ${theme.device.tablet} {
      padding: 0px 1rem;
    }

    @media screen and (max-width: 700px) {
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      gap: 15px;
    }
  }

  .interviewBtn {
    padding: 0px;
    display: flex;
    justify-content: start;
    align-items: center;
    color: ${theme.colors.white};
    font-size: 15px;
    line-height: 0px;
  }

  .serviceWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    background-color: ${theme.colors.lightGrey};
    ${theme.device.tablet} {
      padding: 0px 1rem;
    }
  }

  .service {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    height: 100px;
    gap: 15px;
  }

  .company {
    color: ${theme.colors.mediumGrey};
    font-size: ${theme.fontSize["14"]};
  }
`;

export default Footer;
