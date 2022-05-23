import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { boxShadow } from "../../styles/boxShadow";
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme";
import { bigIcons } from "../../shared/categoryIcons";
import ReactGA from "react-ga";

const DailyQuestions = ({ todaysQuestions }) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const startInterviewHandler = (question) => {
    navigate("/interview/recording", { state: { question } });
  };

  return (
    <DailyQuestionLayout>
      <section>
        <div className="header">
          <h2 className="title">오늘의 추천 면접 질문</h2>
          <p className="subTitle">질문을 선택해서 면접을 녹화해보세요</p>
        </div>
        <div className="main">
          {todaysQuestions.map(({ question }) => {
            return (
              <div
                onClick={
                  width <= 900
                    ? () => {
                        startInterviewHandler(question);
                        ReactGA.event({
                          category: "Daily question",
                          action: "Daily question recording",
                        });
                      }
                    : () => {}
                }
                className="card"
                key={question.id}
              >
                <div className="mobile">
                  <img
                    className="logo"
                    alt="logo"
                    src={bigIcons[question.category]}
                  />
                  <div className="contents">
                    <p
                      style={{
                        color: theme.colors.mediumGrey,
                        marginBottom: "20px",
                      }}
                    >
                      {question.category}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        marginBottom: "20px",
                      }}
                    >
                      Q. {question.contents}
                    </p>
                  </div>
                </div>
                <button
                  onClick={
                    width <= 900
                      ? () => {}
                      : () => {
                          startInterviewHandler(question);
                          ReactGA.event({
                            category: "Daily question",
                            action: "Daily question recording",
                          });
                        }
                  }
                  className="startBtn"
                >
                  {width <= 900 ? "" : "시작하기"}
                  <HiChevronRight size="25px" />
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={() => navigate("/interview")} className="interviewBtn">
          다른 면접 보러가기
        </button>
      </section>
    </DailyQuestionLayout>
  );
};

const DailyQuestionLayout = styled.div`
  ${({ theme }) => {
    const { colors, fontSize, fontWeight, device } = theme;

    return css`
      display: flex;
      justify-content: center;
      margin: 140px 0px;
      width: 100%;

      ${device.tablet} {
        padding: 0px 1rem;
      }

      section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 1200px;
        width: 100%;
      }

      .main {
        width: 100%;
        display: grid;
        margin: 36px 0px;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
        @media screen and (max-width: 900px) {
          grid-template-columns: repeat(1, 1fr);
        }
      }

      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 36px;
        box-sizing: border-box;
        justify-content: space-between;
        ${boxShadow()}

        @media screen and (max-width: 900px) {
          &:hover {
            cursor: pointer;
          }
          flex-direction: row;
          padding: 10px 15px;
        }
      }

      .card:hover {
        outline: 1px solid #7599f3;
      }

      .mobile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @media screen and (max-width: 900px) {
          flex-direction: row;
          width: 100%;
        }
      }

      .logo {
        width: 60px;
        height: 60px;
        padding: 10px;
        background-color: ${colors.lightestGrey};
        border-radius: 8px;
        margin-bottom: 10px;

        @media screen and (max-width: 900px) {
          margin: 0px 15px 0px 0px;
        }
      }

      .contents {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        margin-bottom: 30px;
        overflow-wrap: anywhere;
        @media screen and (max-width: 900px) {
          justify-content: center;
          min-height: 70px;
          height: max-content;
          width: 100%;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 0px;
          p {
            margin-bottom: 0px !important;
            font-size: ${fontSize["16"]} !important;
          }
        }
      }

      & .header {
        text-align: center;
      }

      & .title {
        font-size: ${fontSize["20"]};
        font-weight: ${fontWeight.extraBold};
        margin-bottom: 12px;
      }

      & .subTitle {
        font-size: ${fontSize["14"]};
        color: ${colors.subTitle};
      }

      .startBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 11px 0px 11px 15px;
        border-radius: 4px;
        font-size: ${fontSize["16"]};
        line-height: 0px;
        @media screen and (max-width: 900px) {
          width: 10%;
          padding: 10px;
        }
      }

      .startBtn:hover {
        background-color: #7599f3;
        color: ${colors.white};
      }

      .interviewBtn {
        padding: 14px 30px;
        color: #3771d3;
        border: 1px solid #3771d3;
        border-radius: 25px;
      }

      .interviewBtn:hover {
        background-color: rgba(86, 127, 232, 0.06);
      }
    `;
  }}
`;

export default DailyQuestions;
