import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { getCookie } from "../../shared/cookies";
import NotAvailable from "../NotAvailable";
import scrapIcon from "../../assets/icons/scrap.png";
import cameraIcon from "../../assets/icons/camera.png";
import userIcon from "../../assets/icons/user.png";
import theme from "../../styles/theme";

const MyPage = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const token = getCookie("token");

  const myinfoHandler = () => {
    navigate("/mypage");
  };
  const historyHandler = () => {
    navigate("/mypage/history");
  };
  const scrapHandeler = () => {
    navigate("/mypage/scrap");
  };

  return (
    <>
      {token ? (
        <Container>
          <Sidebar>
            <button
              style={{
                background: pathname === "/mypage" ? theme.colors.main : "",
                color: pathname === "/mypage" ? theme.colors.white : "black",
              }}
              onClick={myinfoHandler}
            >
              <img alt="user" src={userIcon} />내 정보
            </button>
            <button
              style={{
                background:
                  pathname === "/mypage/history" ? theme.colors.main : "",
                color:
                  pathname === "/mypage/history" ? theme.colors.white : "black",
              }}
              onClick={historyHandler}
            >
              <img alt="camera" src={cameraIcon} /> 면접 기록
            </button>
            <button
              style={{
                background:
                  pathname === "/mypage/scrap" ? theme.colors.main : "",
                color:
                  pathname === "/mypage/scrap" ? theme.colors.white : "black",
              }}
              onClick={scrapHandeler}
            >
              <img alt="scrap" src={scrapIcon} />내 스크랩
            </button>
          </Sidebar>
          <Outlet />
        </Container>
      ) : (
        <NotAvailable />
      )}
    </>
  );
};
const Container = styled.div`
  max-width: 1200px;
  padding: 0;
  margin-top: 100px;
  display: flex;

  ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 240px;
  height: 250px;

  margin-right: 40px;

  button {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 6px;
    width: 200px;
    height: 56px;
    padding: 18px 10px;
    border-radius: 8px;
    margin-bottom: 12px;
    font-size: ${({ theme }) => theme.calRem(14)};
    text-align: left;

    &:hover {
      background: ${({ theme }) => `${theme.colors.mainHover} !important`};
      color: ${({ theme }) => `${theme.colors.white} !important`};
      img {
        color: ${({ theme }) => theme.colors.white};
      }
    }
    ${({ theme }) => theme.device.mobile} {
      width: 140px;
      height: 50px;
      padding: 10px 5px;
      text-align: center;
    }
  }

  ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

export default MyPage;
