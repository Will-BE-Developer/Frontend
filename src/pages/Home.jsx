import styled from "styled-components";
import Banner from "../components/Home/Banner";
import DailyQuestion from "../components/Home/DailyQuestions";
import BestInterviews from "../components/Home/BestInterviews";
import subBanner from "../assets/subBanner.png";

const Home = () => {
  return (
    <div>
      <Banner />
      <DailyQuestion />
      <BestInterviews />
      <img
        style={{ maxWidth: "1200px", width: "100%", margin: "40px 0px" }}
        src={subBanner}
        alt="subBanner"
      />
    </div>
  );
};

const SubBannerWrapper = styled.div``;

export default Home;
