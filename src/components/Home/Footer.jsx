import styled from "styled-components";
import footerBanner from "../../assets/footerBanner.png";

const Footer = () => {
  const timing = PerformanceNavigationTiming;
  console.log(timing);
  return (
    <FooterLayout>
      <img alt="footerBanner" src={footerBanner} />
      <div className="service"></div>
    </FooterLayout>
  );
};

const FooterLayout = styled.div`
  img {
    width: 100%;
    height: 140px;
    background-position: center;
    background-image: url(${footerBanner});
    background-size: cover;
  }

  .service {
    width: 100%;
    height: 200px;
    border: 1px solid red;
  }
`;

export default Footer;
