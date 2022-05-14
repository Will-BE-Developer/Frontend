import styled, { css } from "styled-components";
import { HiChevronRight } from "react-icons/hi";
import { boxShadow } from "../../styles/boxShadow";
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme";
import { bigIcons } from "../../shared/categoryIcons";

const DailyQuestions = ({ todaysQuestions }) => {
  const navigate = useNavigate();

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
              <div className="card" key={question.id}>
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
                  <p style={{ fontSize: "20px", marginBottom: "20px" }}>
                    Q. {question.contents}
                  </p>
                </div>
                <button
                  onClick={() =>
                    navigate("/interview/recording", { state: { question } })
                  }
                  className="startBtn"
                >
                  시작하기
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
        @media screen and (max-width: 700px) {
          grid-template-columns: repeat(1, 1fr);
        }
      }

      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 36px;
        ${boxShadow()}
      }

      .card:hover {
        border: 1px solid #7599f3;
      }

      .startBtn:hover {
        background-color: #7599f3;
        color: ${colors.white};
      }

      .logo {
        width: 60px;
        height: 60px;
        padding: 10px;
        background-color: ${colors.lightestGrey};
        border-radius: 8px;
        margin-bottom: 10px;
      }

      .contents {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        margin-bottom: 30px;
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
      }

      .interviewBtn {
        padding: 14px 30px;
        color: #3771d3;
        border: 1px solid #3771d3;
        border-radius: 25px;
      }

      .interviewBtn:hover {
        color: white;
        background-color: #3771d3;
      }
    `;
  }}
`;

export default DailyQuestions;
