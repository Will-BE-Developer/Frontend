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
import * as Sentry from "@sentry/react";

const Home = () => {
  const [homeData, setHomedata] = useState(null);
  useEffect(() => {
    const dummyHomeData = {
      todaysQuestions: [
        {
          question: {
            id: 0,
            category: "Javascript",
            contents: "자바스크립트 문제",
          },
        },
        {
          question: {
            id: 1,
            category: "Algorithm",
            contents: "알고리즘 문제",
          },
        },
        {
          question: {
            id: 2,
            category: "Database",
            contents: "데이터베이스 문제",
          },
        },
      ],
      topCategories: [
        { id: 0, category: "Javascript" },
        {
          id: 1,
          category: "Algorithm",
        },
      ],
      weeklyInterviews: [
        {
          badge: "1등",
          id: 0,
          thumbnail:
            "https://media-cdn.tripadvisor.com/media/photo-s/17/00/7c/d3/llama.jpg",
          user: {
            nickname: "llama",
          },
          question: {
            id: 0,
            category: "Javascript",
            contents: "자바스크립트 문제",
          },
        },
        {
          badge: "2등",
          id: 1,
          thumbnail:
            "https://cdn.newspenguin.com/news/photo/201912/877_1419_234.jpg",
          user: {
            nickname: "quokka",
          },
          question: {
            id: 1,
            category: "Algorithm",
            contents: "알고리즘 문제",
          },
        },
      ],
      latestInterviews: [
        {
          id: 0,
          user: {
            profileImageUrl:
              "https://media-cdn.tripadvisor.com/media/photo-s/17/00/7c/d3/llama.jpg",
            nickname: "llama",
            introduce: "라마!",
            githubLink: "https://github.com/llama-ste",
          },
          thumbnail:
            "https://media-cdn.tripadvisor.com/media/photo-s/17/00/7c/d3/llama.jpg",
          question: {
            id: 0,
            category: "Javascript",
            contents: "자바스크립트 문제",
          },
          isMain: false,
          scrapsMe: true,
          scrapsCount: 5,
          commentsCount: 5,
        },
        {
          id: 1,
          user: {
            profileImageUrl:
              "https://cdn.newspenguin.com/news/photo/201912/877_1419_234.jpg",
            nickname: "quokka",
            introduce: "쿼카!",
            githubLink: "https://github.com/llama-ste",
          },
          thumbnail:
            "https://cdn.newspenguin.com/news/photo/201912/877_1419_234.jpg",
          question: {
            id: 0,
            category: "Algorithm",
            contents: "알고리즘 문제",
          },
          isMain: true,
          scrapsMe: true,
          scrapsCount: 5,
          commentsCount: 5,
        },
      ],
    };
    setHomedata(dummyHomeData);

    return;

    const getHomeData = async () => {
      const { data } = await instance.get("/api/home");
      setHomedata(data);
    };

    try {
      getHomeData();
    } catch (err) {
      Sentry.captureException(`get home data : ${err}`);
    }
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
