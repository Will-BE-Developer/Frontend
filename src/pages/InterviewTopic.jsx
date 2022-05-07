import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import instance from "../apis/axios";
import GlobalButton from "../components/UI/GlobalButton";

const InterviewTopic = () => {
  const [topic, setTopic] = useState([]);
  const [selectTopic, setSelectTopic] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get("/api/categories")
      .then((res) => {
        setTopic(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <TopicBox>
      <p className="title">면접 주제를 선정해주세요.</p>
      <div className="topic">
        {topic.map((topic, index) => {
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
        <GlobalButton
          margin="0px 0px 40px 0px"
          onClick={() =>
            navigate("/interview/recording", { state: selectTopic })
          }
        >
          면접 시작하기
          <HiChevronRight size="25px" />
        </GlobalButton>
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
    text-align: start;
    padding: 0px 120px;
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }
`;

export default InterviewTopic;
