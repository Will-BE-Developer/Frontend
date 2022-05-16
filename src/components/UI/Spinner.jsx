import React from "react";
import Styled from "styled-components";
import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Spinner = ({ text }) => {
  return (
    <Container>
      <div className="loader_box">
        <PacmanLoader color="#567FE8" loading={true} />
        <div className="text">{text}</div>
      </div>
    </Container>
  );
};

const Container = Styled.div`
    width: 100%;
    height: 500px; 
    margin: 0 auto;

    .loader_box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 30px;
      .text {
        color: #2D3037;
        margin-top: 30px;
        font-size: 20px;
        font-weight: 700;

      }
    }

    
`;
export default Spinner;
