import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/configStore";
import theme from "./styles/theme";
import App from "./App";

import ScrollToTop from "./components/UI/ScrollToTop";
import RequireAuth from "./components/Auth/RequireAuth";
import Loader from "./components/UI/Loader";

const Home = lazy(() => import("./pages/Home"));
const Interview = lazy(() => import("./pages/Interview/Interview"));
const InterviewTopic = lazy(() => import("./pages/Interview/InterviewTopic"));
const InterviewRecording = lazy(() =>
  import("./pages/Interview/InterviewRecording")
);
const KakaoRedirect = lazy(() => import("./pages/KakaoRedirect"));
const SigninValidation = lazy(() => import("./pages/SigninValidation"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const FeedBack = lazy(() => import("./pages/FeedBack/FeedBack"));
const FeedBackDetail = lazy(() => import("./pages/FeedBack/FeedBackDetail"));
const FeedbackUpdate = lazy(() => import("./pages/FeedBack/FeedbackUpdate"));
const MyPage = lazy(() => import("./pages/MyPage/MyPage"));
const MyProfile = lazy(() => import("./pages/MyPage/MyProfile"));
const MyHistory = lazy(() => import("./pages/MyPage/MyHistory"));
const MyScrap = lazy(() => import("./pages/MyPage/MyScrap"));
const NotFound = lazy(() => import("./pages/NotFound"));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/" element={<App />}>
                <Route path="" element={<Home />} />
                <Route path="feedback" element={<FeedBack />} />
                <Route path="feedback/:cardId" element={<FeedBackDetail />} />
                <Route
                  path="feedback/update/:cardId"
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
