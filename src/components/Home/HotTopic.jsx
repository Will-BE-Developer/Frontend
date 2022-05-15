import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import GlobalBadge from "../UI/GlobalBadge";
import theme from "../../styles/theme";

const HotTopic = ({ hotCategories }) => {
  const navigate = useNavigate();

  return (
    <HotTopicLayout>
      <section>
        <h2 className="title">요즘 Hot한 주제 키워드 골라보기</h2>
        <p className="description">주제별로 피드백 영상을 볼 수 있습니다</p>
        <div className="topics">
          <div>
            {hotCategories.map((topic, idx) => {
              return (
                <GlobalBadge
                  fontSize="14px"
                  onClick={() =>
                    navigate("/feedback", { state: topic.category })
                  }
                  padding="11px 16px"
                  background={
                    idx % 2 === 0 ? theme.colors.blue : theme.colors.white
                  }
                  color={idx % 2 === 0 ? theme.colors.white : theme.colors.blue}
                  border={idx % 2 !== 0 && "1px solid rgba(86, 127,	232, 0.6)"}
                  text={`#${topic.category}`}
                  key={topic.id}
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
        background-color: rgba(86, 127, 232, 0.06);
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

        @media screen and (max-width: 400px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
  }}
`;

export default HotTopic;
