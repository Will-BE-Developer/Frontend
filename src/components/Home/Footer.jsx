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
      <div className="service"></div>
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
  }

  .interviewBtn {
    overflow: visible;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.colors.white};
    border-radius: 25px;
    font-size: 15px;
    line-height: 0px;
  }

  .service {
    max-width: 1200px;
    width: 100%;
    height: 200px;
  }
`;

export default Footer;
