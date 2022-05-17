import styled, { css } from "styled-components";
import { HiChevronRight } from "react-icons/hi";
import GlobalCard from "../UI/GlobalCard";
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme";
import GlobalButton from "../UI/GlobalButton";

const LatestFeedback = ({ latestInterviews }) => {
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
        <GlobalButton
          radius="25px"
          margin="10px 0px 0px 0px"
          hover={({ theme }) => theme.colors.grey5}
          background={theme.colors.white}
          color={theme.colors.black}
          border="1px solid rgba(130, 130, 130, 0.2)"
          onClick={() => navigate("/feedback")}
        >
          피드백 보러가기
          <HiChevronRight size="25px" color={theme.colors.grey50} />
        </GlobalButton>
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
      }

      .cardWrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin: 36px 0px 20px 0px;
        @media screen and (max-width: 900px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media screen and (max-width: 500px) {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    `;
  }}
`;

export default LatestFeedback;
