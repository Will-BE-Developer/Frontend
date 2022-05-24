import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie } from "../../shared/cookies";
import logo from "../../assets/logo.png";
import homeIcon from "../../assets/icons/mNavbar_home.svg";
import feedbackIcon from "../../assets/icons/mNavbar_feedback.svg";
import interviewIcon from "../../assets/icons/mNavbar_interview.svg";
import mypageIcon from "../../assets/icons/mNavbar_mypage.svg";
import { signout } from "../../store/slices/userSlice";

import GlobalModal from "../../components/UI/GlobalModal";
import { IoAlertCircle } from "react-icons/io5";
import { GiHamburger } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [openSignOuteModal, setOpenSignOutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const signOutHandler = () => {
    const signoutDispatch = async () => {
      try {
        await dispatch(signout()).unwrap();
        setOpenSignOutModal(false);
        navigate("/", { replace: true });
      } catch (err) {
        console.log(err);
      }
    };
    signoutDispatch();
  };

  const scrollToTop = () => {
    setIsClicked(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const mobileHandler = () => {
      if (window.innerWidth <= 960) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", mobileHandler);

    return () => window.removeEventListener("resize", mobileHandler);
  }, []);

  const clickBurgerHandler = () => setIsClicked(!isClicked);

  return (
    <HeaderContainer>
      <GlobalModal
        title="로그아웃"
        confirmText="로그아웃"
        open={openSignOuteModal}
        onClose={() => setOpenSignOutModal(false)}
        onConfirm={signOutHandler}
        isConfirm
        isIcon
        icon={<AlertIcon />}
      >
        로그아웃 하시겠습니까?
      </GlobalModal>
      {!isMobile ? (
        <nav className="nav">
          <ul style={{ display: "flex", gap: "20px" }}>
            <li>
              <Link to="/" onClick={scrollToTop}>
                <img alt="logo" src={logo} />
              </Link>
            </li>
            <li>
              <Link to="/feedback" onClick={scrollToTop}>
                피드백
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/interview">면접보기</Link>
            </li>
            <li>{token ? <Link to="/mypage">마이페이지</Link> : ""}</li>
          </ul>
          <div>
            {token ? (
              <span
                className="signout"
                onClick={() => setOpenSignOutModal(true)}
              >
                로그아웃
              </span>
            ) : (
              <Link to="/signin">로그인</Link>
            )}
          </div>
        </nav>
      ) : (
        <Mobile className={isClicked ? `nav_active` : `nav_wrap`}>
          <Link to="/" onClick={scrollToTop}>
            <img alt="logo" src={logo} />
          </Link>
          {!isClicked ? (
            <>
              <button className="hamburger" onClick={clickBurgerHandler}>
                <GiHamburger />
              </button>
            </>
          ) : (
            <MobileNav>
              <div className="nav_box">
                <div className="header">
                  <Link to="/" onClick={scrollToTop}>
                    <img alt="logo" src={logo} />
                  </Link>
                  <button className="close_burger" onClick={clickBurgerHandler}>
                    <AiOutlineClose />
                  </button>
                </div>

                <ul className="nav_list">
                  <li>
                    <Link to="/feedback" onClick={scrollToTop}>
                      <img src={homeIcon} alt="home_icon" />홈
                    </Link>
                  </li>
                  <li>
                    <Link to="/feedback" onClick={scrollToTop}>
                      <img src={feedbackIcon} alt="feedback_icon" /> 피드백
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/interview" onClick={scrollToTop}>
                      <img src={interviewIcon} alt="interview_icon" /> 면접보기
                    </Link>
                  </li>
                  <li>
                    {token ? (
                      <Link to="/mypage" onClick={scrollToTop}>
                        <img src={mypageIcon} alt="mypage_icon" /> 마이페이지
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>

                <div className="footer">
                  <ul>
                    <li>
                      <Link to="/feedback" onClick={scrollToTop}>
                        팀원소개
                      </Link>
                    </li>
                    <li>
                      <Link to="/interview">설문조사하기</Link>
                    </li>
                    <li>
                      {token ? (
                        <span
                          className="signout"
                          onClick={() => setOpenSignOutModal(true)}
                        >
                          로그아웃
                        </span>
                      ) : (
                        <Link to="/signin">로그인</Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </MobileNav>
          )}
        </Mobile>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  ${({ theme }) => {
    const { colors, fontWeight } = theme;

    return css`
      list-style: none;
      position: fixed;
      display: flex;
      justify-content: center;
      top: 0;
      left: 0;
      z-index: 300;
      padding: 0px;
      width: 100%;
      height: 60px;
      box-shadow: 0 2px 5px rgba(130, 130, 130, 0.1);
      background: white;
      font-weight: ${fontWeight.semiExtraBold};
      :hover {
        a {
          color: #888888;
        }

        div > span {
          color: #888888;
        }
      }

      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        width: 100%;
        height: 60px;

        ul {
          align-items: center;
        }

        a {
          display: flex;
          align-items: center;
          :hover {
            color: ${colors.black};
          }
        }
      }

      .signout {
        cursor: pointer;
        :hover {
          color: ${colors.black};
        }
      }

      ${({ theme }) => theme.device.tablet} {
        padding: 0px 0px 0px 0.5rem;
      }
    `;
  }}
`;

const Mobile = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .hamburger {
    font-size: 20px;

    color: ${({ theme }) => theme.colors.main};
  }

  .nav_wrap {
  }
`;

const MobileNav = styled.nav`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      margin: 0;
      padding: 0;

      .nav_box {
        width: 90vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;

        background-color: white;
        width: 100vw;
        height: 100vh;

        .header {
          box-shadow: 0 2px 5px rgba(130, 130, 130, 0.1);
          padding: 13px 1rem;
          width: 100%;
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;

          .close_burger {
            font-size: 20px;
            font-weight: 800;
          }
        }
        .nav_list {
          padding: 10px 30px;
          background-color: white;
          height: 100%;
          font-size: 28px;
          width: 100%;
          text-align: left;
          li {
            margin: 60px 0;
          }
          a {
            display: flex;
            align-items: center;
            gap: 10px;
            :hover {
              color: ${colors.black};
            }
          }
          img {
            width: 28px;
          }
        }

        .footer {
          padding: 10px 30px;
          width: 100%;
          padding-bottom: 120px;
          ul {
            display: flex;
            justify-content: space-between;
          }

          a {
            :hover {
              color: ${colors.black};
            }
          }
        }
      }
    `;
  }}
`;

const AlertIcon = styled(IoAlertCircle)`
  font-size: 24px;
  color: #ec5959;
`;

export default Header;
