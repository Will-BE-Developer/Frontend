import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <Title>WillBe</Title>
      </Link>
      <div>
        <Link style={{ marginRight: "10px" }} to="/signin">
          로그인
        </Link>
        <Link to="/signup">회원가입</Link>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  ${({ theme }) => {
    const { colors, device } = theme;
    return css`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      width: 100%;
      height: 80px;
      background-color: ${colors.headerBgColor};
      box-shadow: 0 2px 5px rgba(130, 130, 130, 0.1);
      ${device.tablet} {
        height: 100px;
      }
    `;
  }}//
`;

const Title = styled.h1`
  ${({ theme }) => {
    const { colors, device, fontSize } = theme;
    return css`
      color: ${colors.black};
      font-weight: 600;
    `;
  }}
`;

export default Header;
