import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import SetInfo from "../components/Signup/SetInfo";
import SignupForm from "../components/Signup/SignupForm";

const Signup = () => {
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(state ? state : 1);

  return (
    <>
      <GlobalStyles />
      <Wrap>
        {currentPage === 1 ? (
          <SignupForm
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <SetInfo currentPage={currentPage} setCurrentPage={setCurrentPage} />
        )}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  margin: auto;
`;

export default Signup;
