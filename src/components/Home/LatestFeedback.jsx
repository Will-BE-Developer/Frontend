import styled, { css } from "styled-components";
import { HiChevronRight } from "react-icons/hi";
import GlobalCard from "../UI/GlobalCard";
import { useNavigate } from "react-router-dom";

const LatestFeedback = ({ latestInterviews }) => {
  console.log(latestInterviews);
  const navigate = useNavigate();

  return (
    <LatestFeedbackLayout>
      <section>
        <div className="header">
          <h2 className="title">최신 피드백</h2>
          <p className="subTitle">최근에 등록된 피드백 먼저 확인해보세요</p>
        </div>
        <div className="cardWrapper">
          {latestInterviews.map((interview) => {
            return <GlobalCard card={interview} key={interview.id} />;
          })}
        </div>
        <button onClick={() => navigate("/feedback")} className="interviewBtn">
          더 보기
          <HiChevronRight size="20px" />
        </button>
      </section>
    </LatestFeedbackLayout>
  );
};

const LatestFeedbackLayout = styled.div`
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

      .cardWrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 20px;
        @media screen and (max-width: 900px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media screen and (max-width: 550px) {
          grid-template-columns: repeat(1, 1fr);
        }
      }

      .interviewBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 18px 12px 24px;
        color: ${colors.black};
        border: 2px solid ${colors.headerBgColor};
        border-radius: 25px;
      }
    `;
  }}
`;

export default LatestFeedback;
