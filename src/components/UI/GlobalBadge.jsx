import styled, { css } from "styled-components";

const GlobalBadge = (props) => {
  const { color, background, text, border, children } = props;

  const styles = {
    color,
    background,
    text,
    border,
  };

  return <BadgeLayout {...styles}>{text ? text : children}</BadgeLayout>;
};

const BadgeLayout = styled.span`
  ${({ theme }) => {
    const { colors, fontSize } = theme;
    return css`
      color: ${(props) => (props.color ? props.color : colors.white)};
      background: ${(props) =>
        props.background ? props.background : colors.white};
      border: ${(props) => (props.border ? props.border : "none")};
      border-radius: 20px;
      padding: 5px 12px;
      font-size: ${fontSize["12"]};
    `;
  }}
`;

export default GlobalBadge;
