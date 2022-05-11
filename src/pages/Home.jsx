import GlobalStyles from "../styles/GlobalStyles";
import Header from "../components/layout/Header";
import Banner from "../components/Home/Banner";
import DailyQuestion from "../components/Home/DailyQuestions";
import BestInterviews from "../components/Home/BestInterviews";
import HotTopic from "../components/Home/HotTopic";
import LatestFeedback from "../components/Home/LatestFeedback";
import Footer from "../components/Home/Footer";

const Home = () => {
  return (
    <div>
      <GlobalStyles home />
      <Header />
      <Banner />
      <DailyQuestion />
      <HotTopic />
      <BestInterviews />
      <LatestFeedback />
      <Footer />
    </div>
  );
};

export default Home;
