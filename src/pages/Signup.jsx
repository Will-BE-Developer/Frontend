import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";

import SetInfo from "../components/Signup/SetInfo";
import SignupStart from "../components/Signup/SignupStart";
import SignupForm from "../components/Signup/SignupForm";

const Signup = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <GlobalStyles />
      <Wrap>
        {currentPage === 0 && (
          <SignupStart
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
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
