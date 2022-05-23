import React from "react";
import ReactDOM from "react-dom";
import { BrowserTracing } from "@sentry/tracing";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Sentry from "@sentry/react";
import ReactGA from "react-ga";

import store from "./store/configStore";
import theme from "./styles/theme";
import App from "./App";

import ScrollToTop from "./components/UI/ScrollToTop";
import RequireAuth from "./components/Auth/RequireAuth";

import Home from "./pages/Home";
import Interview from "./pages/Interview/Interview";
import InterviewTopic from "./pages/Interview/InterviewTopic";
import InterviewRecording from "./pages/Interview/InterviewRecording";
import KakaoRedirect from "./pages/KakaoRedirect";
import SigninValidation from "./pages/SigninValidation";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import FeedBack from "./pages/FeedBack/FeedBack";
import FeedBackDetail from "./pages/FeedBack/FeedBackDetail";
import FeedbackUpdate from "./pages/FeedBack/FeedbackUpdate";
import MyPage from "./pages/MyPage/MyPage";
import MyProfile from "./pages/MyPage/MyProfile";
import MyHistory from "./pages/MyPage/MyHistory";
import MyScrap from "./pages/MyPage/MyScrap";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import Check from "./components/Check";

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

ReactGA.initialize(TRACKING_ID);

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],

  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="" element={<Check />}>
              <Route path="" element={<Home />} />
              <Route path="/" element={<App />}>
                <Route path="feedback" element={<FeedBack />} />
                <Route path="feedback/:cardId" element={<FeedBackDetail />} />
                <Route
                  path="feedback/:cardId/update"
                  element={<FeedbackUpdate />}
                />
                <Route path="mypage" element={<MyPage />}>
                  <Route
                    path=""
                    element={
                      <RequireAuth>
                        <MyProfile />
                      </RequireAuth>
                    }
                  />
                  <Route path="history" element={<MyHistory />} />
                  <Route path="scrap" element={<MyScrap />} />
                </Route>
              </Route>
              <Route path="interview" element={<Interview />}>
                <Route path="" element={<InterviewTopic />} />
                <Route path="recording" element={<InterviewRecording />} />
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/user/kakao/callback" element={<KakaoRedirect />} />
              <Route path="/signin/validation" element={<SigninValidation />} />
              <Route path="/notice" element={<ServerError />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
