import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie } from "../../shared/cookies";
import logo from "../../assets/logo.png";
import { signout } from "../../store/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");

  const logoutHandler = () => {
    const signoutDispatch = async () => {
      try {
        await dispatch(signout()).unwrap();
        navigate("/", { replace: true });
      } catch (err) {
        console.log(err);
      }
    };

    signoutDispatch();
  };

  return (
    <HeaderContainer>
      <div className="nav">
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/">
            <Title>
              <img alt="logo" src={logo} />
            </Title>
          </Link>
          <Link to="/feedback">피드백</Link>
          <Link to="/interview">면접보기</Link>
          {token ? <Link to="/mypage">마이페이지</Link> : ""}
        </div>
        <div>
          {token ? (
            <span className="signout" onClick={logoutHandler}>
              로그아웃
            </span>
          ) : (
            <Link to="/signin">로그인</Link>
          )}
        </div>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
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

export default Header;
