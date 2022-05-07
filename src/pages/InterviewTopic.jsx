import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

const TOPIC = [
  "면접주제 1",
  "면접주제 2",
  "면접주제 3",
  "면접주제 4",
  "면접주제 5",
  "면접주제 6",
  "면접주제 7",
  "면접주제 8",
  "면접주제 9",
  "면접주제 10",
];

const InterviewTopic = () => {
  const [selectTopic, setSelectTopic] = useState();
  const navigate = useNavigate();

  return (
    <TopicBox>
      <p className="title">면접 주제를 선정해주세요.</p>
      <div className="topic">
        {TOPIC.map((topic, index) => {
          return (
            <label key={index}>
              <input
                onChange={() => setSelectTopic(topic)}
                value={topic}
                type="radio"
                name="topic"
              />
              {topic}
            </label>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="startBtn"
          onClick={() => navigate("/interview/recording")}
        >
          면접 시작하기
          <HiChevronRight />
        </button>
      </div>
    </TopicBox>
  );
};

const TopicBox = styled.div`
  width: 100%;
  max-width: 980px;
  margin-top: 15vh;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(130, 130, 130, 0.3);

  & .title {
    padding: 23px 0px;
    background-color: ${({ theme }) => theme.colors.headerBgColor};
    font-size: ${({ theme }) => theme.fontSize["20"]};
  }

  & .topic {
    padding: 0px 120px;
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }

  & .startBtn {
    display: flex;
    margin-bottom: 40px;
    padding: 11px 18px;
    border-radius: 4px;
    border: 1px solid rgba(130, 130, 130, 0.2);
  }
`;

export default InterviewTopic;
