import styled from "styled-components";
import Banner from "../components/Home/Banner";
import DailyQuestion from "../components/Home/DailyQuestions";
import BestInterviews from "../components/Home/BestInterviews";
import HotTopic from "../components/Home/HotTopic";
import subBanner from "../assets/subBanner.png";

const Home = () => {
  return (
    <div>
      <Banner />
      <DailyQuestion />
      <HotTopic />
      <BestInterviews />
      <img
        style={{ maxWidth: "1200px", width: "100%", marginBottom: "140px" }}
        src={subBanner}
        alt="subBanner"
      />
    </div>
  );
};

const SubBannerWrapper = styled.div``;

export default Home;
