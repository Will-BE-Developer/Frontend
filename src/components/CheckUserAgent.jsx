import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import ReactGA from "react-ga";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import { isIE } from "react-device-detect";

const CheckUserAgent = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);

  if (isIE) {
    return (
      <IENotice>
        <GlobalStyles />
        <h1>IE는 지원하지 않습니다</h1>
        <p>다른 브라우저로 접속해주세요</p>
      </IENotice>
    );
  }

  return <Outlet />;
};

const IENotice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100vw;
  height: 80vh;

  h1 {
    font-size: 24px;
  }
`;

export default CheckUserAgent;
