import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import GlobalBadge from "../UI/GlobalBadge";
import theme from "../../styles/theme";

const DUMMY_TOPICS = [
  "#Spring",
  "#React",
  "#Java",
  "#General",
  "#Database",
  "Javascript",
];

const HotTopic = () => {
  const navigate = useNavigate();

  return (
    <HotTopicLayout>
      <section>
        <h2 className="title">요즘 Hot한 주제 키워드 골라보기</h2>
        <p className="description">주제별로 피드백 영상을 볼 수 있습니다</p>
        <div className="topics">
          <div>
            {DUMMY_TOPICS.map((ele, idx) => {
              return (
                <GlobalBadge
                  onClick={() => navigate("/feedback", { state: ele })}
                  padding="11px 16px"
                  background={theme.colors.blue}
                  text={ele}
                  key={idx}
                />
              );
            })}
          </div>
        </div>
      </section>
    </HotTopicLayout>
  );
};

const HotTopicLayout = styled.div`
  ${({ theme }) => {
    const { fontSize, fontWeight, colors, device } = theme;

    return css`
      display: flex;
      justify-content: center;
      min-height: 200px;
      width: 100%;
      margin-bottom: 140px;

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

      & .title {
        font-size: ${fontSize["20"]};
        font-weight: ${fontWeight.extraBold};
        margin-bottom: 12px;
      }

      & .description {
        font-size: ${fontSize["14"]};
        color: ${colors.subTitle};
        margin-bottom: 36px;
      }

      & .topics {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 35px;
        width: 100%;
        background: ${colors.headerBgColor};
        border-radius: 4px;
      }

      & .topics div {
        width: 800px;
        text-align: center;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 20px;

        @media screen and (max-width: 700px) {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `;
  }}
`;

export default HotTopic;
