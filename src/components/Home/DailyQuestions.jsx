import styled, { css } from "styled-components";
import { HiChevronRight } from "react-icons/hi";
import { boxShadow } from "../../styles/boxShadow";
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme";
import GlobalBadge from "../UI/GlobalBadge";
import face from "../../assets/face.png";

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
                <img className="logo" alt="logo" src={face} />
                <div className="contents">
                  <GlobalBadge
                    background={theme.colors.pink}
                    text={question.category}
                  />
                  <p>{question.contents}</p>
                </div>
                <button
                  onClick={() =>
                    navigate("/interview/recording", { state: { question } })
                  }
                  className="startBtn"
                >
                  시작하기
                  <HiChevronRight size="20px" />
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={() => navigate("/interview")} className="interviewBtn">
          면접 보러가기
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
        grid-template-columns: repeat(3, 1fr);
        margin-bottom: 25px;

        @media screen and (max-width: 700px) {
          grid-template-columns: repeat(1, 1fr);
        }
      }

      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 36px;
      }

      & .card:hover {
        ${boxShadow()}

        .startBtn {
          background-color: ${colors.lightestGrey};
        }
      }

      .logo {
        padding: 10px;
        background-color: ${colors.lightestGrey};
        border-radius: 8px;
        margin-bottom: 24px;
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
        margin-bottom: 25px;
      }

      .startBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 11px 0px;
        border-radius: 4px;
        font-size: ${fontSize["16"]};
      }

      .interviewBtn {
        padding: 14px 30px;
        color: #3771d3;
        border: 1px solid #3771d3;
        border-radius: 25px;
      }
    `;
  }}
`;

export default DailyQuestions;
