import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  *{
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    font-family: 'Pretendard-Regular';
    margin: ${(props) => (props.home ? "60px auto 0px auto" : "60px auto")};
  }

  &:focus,&:hover,&:active{
  outline:none 
  }

  a {
    text-decoration: none;
    color : black;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea,
  button {
    border: none;
    background-color: transparent;
    outline: none;
  }

  img {
    -webkit-user-drag: none;
  }
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyles;
