import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Lato', sans-serif;
    src: url();
    font-weight: normal;
    font-style: normal;
  }

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
    margin: 60px auto;
    /* padding: 0px 3rem; */

  
   
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

  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyles;
