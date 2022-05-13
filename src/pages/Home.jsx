import GlobalStyles from "../styles/GlobalStyles";
import Header from "../components/layout/Header";
import Banner from "../components/Home/Banner";
import DailyQuestion from "../components/Home/DailyQuestions";
import BestInterviews from "../components/Home/BestInterviews";
import HotTopic from "../components/Home/HotTopic";
import LatestFeedback from "../components/Home/LatestFeedback";
import Footer from "../components/Home/Footer";
import { useEffect, useState } from "react";
import instance from "../apis/axios";

const Home = () => {
  const [homeData, setHomedata] = useState(null);
  useEffect(() => {
    instance
      .get("/api/home")
      .then(
        ({
          data: {
            latestInterviews,
            todaysQuestions,
            topCategories,
            weeklyInterviews,
          },
        }) => {
          setHomedata({
            latestInterviews,
            todaysQuestions,
            topCategories,
            weeklyInterviews,
          });
        }
      );
  }, []);

  return (
    <div>
      {homeData && (
        <>
          <GlobalStyles home />
          <Header />
          <Banner />
          <DailyQuestion todaysQuestions={homeData.todaysQuestions} />
          <HotTopic hotCategories={homeData.topCategories} />
          <BestInterviews weeklyInterviews={homeData.weeklyInterviews} />
          <LatestFeedback latestInterviews={homeData.latestInterviews} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
