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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          background: "rgb(255, 244, 229)",
        }}
      >
        <Alert
          severity="warning"
          sx={{ maxWidth: "1200px", width: "100%", padding: "6px 10px" }}
        >
          <AlertTitle>서비스 종료</AlertTitle>
          2022년 11월 11일부로 윌비 서비스를 종료합니다.
          <br />
          윌비 서비스를 지속 제공하지 못하게 된점 진심으로 사과드리며 고객님들의
          넓은 양해를 부탁드립니다.
          <br />
          그동안 윌비를 아껴주시고 사랑해주신 여러분께 진심으로 감사드립니다.
        </Alert>
      </Box>
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
