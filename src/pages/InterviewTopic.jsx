import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import interviewApis from "../apis/interviewApis";
import GlobalButton from "../components/UI/GlobalButton";
import { boxShadow } from "../styles/boxShadow";

const InterviewTopic = () => {
  const [topics, setTopics] = useState([]);
  const [selectTopic, setSelectTopic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    interviewApis
      .getCategories()
      .then((categories) => {
        setTopics(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectTopicHandler = () => {
    if (selectTopic.length === 0) {
      alert("주제를 선택해주세요");
      return;
    }
    navigate("/interview/recording", { state: selectTopic });
  };

  return (
    <TopicBox>
      <p className="title">면접 주제를 선정해주세요.</p>
      <div className="topic">
        {topics?.map((topic, index) => {
          return (
            <label key={index}>
              <input
                onChange={() => setSelectTopic(topic)}
                value={topic}
                type="radio"
                name="topic"
              />
              <span>{topic}</span>
            </label>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <GlobalButton margin="0px 0px 40px 0px" onClick={selectTopicHandler}>
          면접 시작하기
          <HiChevronRight size="25px" />
        </GlobalButton>
      </div>
    </TopicBox>
  );
};

const TopicBox = styled.div`
  ${({ theme }) => {
    const { colors, fontSize, device } = theme;

    return css`
      width: 100%;
      max-width: 980px;
      margin-top: 15vh;
      text-align: center;
      ${boxShadow()}

      & .title {
        padding: 23px 0px;
        background-color: ${colors.headerBgColor};
        font-size: ${fontSize["20"]};
      }

      & .topic {
        text-align: start;
        padding: 0px 100px;
        margin-top: 40px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 30px;
        white-space: nowrap;

        ${device.tablet} {
          grid-template-columns: repeat(3, 1fr);
        }
        ${device.mobile} {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
  }}
`;

export default InterviewTopic;
