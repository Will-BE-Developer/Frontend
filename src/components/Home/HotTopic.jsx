import styled from "styled-components";
import { css } from "styled-components";
import GlobalBadge from "../UI/GlobalBadge";
import theme from "../../styles/theme";

const DUMMY_TOPICS = ["#FRONTENT", "#DESIGN", "#BACKEND", "#CS", "#HTTP"];

const HotTopic = () => {
  return (
    <HotTopicLayout>
      <h2 className="title">요즘 Hot한 주제 키워드 골라보기</h2>
      <p className="description">주제별로 피드백 영상을 볼 수 있습니다</p>
      <div className="topics">
        {DUMMY_TOPICS.map((ele, idx) => {
          return (
            <GlobalBadge
              padding="11px 16px"
              background={theme.colors.blue}
              text={ele}
              key={idx}
            />
          );
        })}
      </div>
    </HotTopicLayout>
  );
};

const HotTopicLayout = styled.div`
  ${({ theme }) => {
    const { fontSize, fontWeight, colors } = theme;

    return css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      width: 100%;
      margin-bottom: 140px;

      & .title {
        font-size: ${fontSize["20"]};
        font-weight: ${fontWeight.extraBold};
        margin-bottom: 12px;
      }

      & .description {
        font-size: ${fontSize["14"]};
        color: ${colors.lightGrey};
        margin-bottom: 36px;
      }

      & .topics {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding: 40px;
        width: 100%;
        background: ${colors.headerBgColor};
        border-radius: 4px;
      }
    `;
  }}
`;

export default HotTopic;
