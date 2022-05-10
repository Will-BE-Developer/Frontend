import GlobalStyles from "../styles/GlobalStyles";
import Header from "../components/layout/Header";
import Banner from "../components/Home/Banner";
import DailyQuestion from "../components/Home/DailyQuestions";
import BestInterviews from "../components/Home/BestInterviews";
import HotTopic from "../components/Home/HotTopic";

const Home = () => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <Banner />
      <DailyQuestion />
      <HotTopic />
      <BestInterviews />
    </div>
  );
};

export default Home;
