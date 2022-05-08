import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Interview = () => {
  return (
    <InterviewWrapper>
      <Outlet />
    </InterviewWrapper>
  );
};

const InterviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default Interview;
