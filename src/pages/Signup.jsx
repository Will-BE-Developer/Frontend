import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";

import SetInfo from "../components/Signup/SetInfo";

import SignupForm from "../components/Signup/SignupForm";

const Signup = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
