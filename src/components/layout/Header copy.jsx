import { useState } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie } from "../../shared/cookies";
import logo from "../../assets/logo.png";
import { signout } from "../../store/slices/userSlice";

import GlobalModal from "../../components/UI/GlobalModal";
import { IoAlertCircle } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [openSignOuteModal, setOpenSignOutModal] = useState(false);

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
    window.scrollTo(0, 0);
  };

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
      <nav className="nav">
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" onClick={scrollToTop}>
            <Title>
              <img alt="logo" src={logo} />
            </Title>
          </Link>

          <Link to="/feedback" onClick={scrollToTop}>
            피드백
          </Link>

          <Link to="/interview">면접보기</Link>
          {token ? <Link to="/mypage">마이페이지</Link> : ""}
        </div>
        <div>
          {token ? (
            <span className="signout" onClick={() => setOpenSignOutModal(true)}>
              로그아웃
            </span>
          ) : (
            <Link to="/signin">로그인</Link>
          )}
        </div>
      </nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.nav`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      position: fixed;
      display: flex;
      justify-content: center;
      top: 0;
      left: 0;
      z-index: 100;
      padding: 0px;
      width: 100%;
      height: 60px;
      box-shadow: 0 2px 5px rgba(130, 130, 130, 0.1);
      background: white;

      & .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        width: 100%;
        height: 60px;
        padding: 0px 1rem;

        & a {
          display: flex;
          align-items: center;
        }

        & .signout {
          cursor: pointer;
        }

        @media screen and (min-width: 1240px) {
          padding: 0px;
        }
      }
    `;
  }}//
`;

const Title = styled.h1`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      color: ${colors.black};
      font-weight: 600;
    `;
  }}
`;

const AlertIcon = styled(IoAlertCircle)`
  font-size: 24px;
  color: #ec5959;
`;

export default Header;
