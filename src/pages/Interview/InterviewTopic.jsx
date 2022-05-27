import styled, { css } from "styled-components";
import ReactGA from "react-ga";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { HiChevronRight } from "react-icons/hi";
import interviewApis from "../../apis/interviewApis";
import GlobalButton from "../../components/UI/GlobalButton";
import { boxShadow } from "../../styles/boxShadow";
import { smallIcons } from "../../shared/categoryIcons";

const InterviewTopic = () => {
  const [topics, setTopics] = useState([]);
  const [selectTopic, setSelectTopic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const {
        data: { categories },
      } = await interviewApis.getCategories();
      setTopics(categories);
    };

    try {
      getCategories();
    } catch (err) {
      Sentry.captureException(`Get categories : ${err}`);
    }
  }, []);

  const selectTopicHandler = () => {
    if (selectTopic.length === 0) {
      alert("주제를 선택해주세요");
      return;
    }
    navigate("/interview/recording", { state: { selectTopic } });

    ReactGA.event({
      category: "Interview Topic",
      action: "Go to the interview recording",
    });
  };

  return (
    <TopicBox>
      <p className="title">면접 주제를 선정해주세요</p>
      <div className="topic">
        {topics?.map((topic, index) => {
          return (
            <label
              className={topic === selectTopic ? "select" : "false"}
              htmlFor={topic}
              key={index}
            >
              <div>
                <img alt="logo" src={smallIcons[topic]} />
                <span style={{ fontSize: "14px" }}>{topic}</span>
              </div>
              <input
                onChange={() => setSelectTopic(topic)}
                value={topic}
                type="radio"
                name="topic"
                id={topic}
              />
            </label>
          );
        })}
      </div>
      <div className="startBtn">
        <GlobalButton
          _width="50%"
          onClick={selectTopicHandler}
          background={({ theme }) => theme.colors.main}
          _fontSize={16}
          text="면접 시작하기"
          hover={({ theme }) => theme.colors.mainHover}
        >
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

      @media screen and (max-width: 700px) {
        margin-top: 5vh;
      }

      ${boxShadow()}

      & .title {
        padding: 23px 0px;
        background-color: ${colors.lightGrey};
        font-size: ${fontSize["20"]};
        border-start-end-radius: 12px;
        border-start-start-radius: 12px;
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

        @media screen and (max-width: 800px) {
          padding: 20px;
        }

        ${device.tablet} {
          grid-template-columns: repeat(3, 1fr);
        }
        @media screen and (max-width: 650px) {
          grid-template-columns: repeat(2, 1fr);
        }

        ${device.mobile} {
          grid-template-columns: repeat(1, 1fr);
        }
      }

      & .topic label {
        display: flex;
        justify-content: space-between;
        align-items: center;

        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 8px 12px;
      }

      & .topic label:hover {
        border: 1px solid ${colors.main};
      }

      & .topic label div {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      & .topic label div img {
        margin-right: 8px;
      }

      .select {
        background-color: rgba(86, 127, 232, 0.06);
        border: 1px solid ${colors.main} !important;
      }

      .startBtn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
      }
    `;
  }}
`;

export default InterviewTopic;
