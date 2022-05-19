import styled, { css } from "styled-components";

const GlobalBadge = (props) => {
  const {
    color,
    background,
    text,
    border,
    children,
    padding,
    onClick,
    fontSize,
    hover,
  } = props;

  const styles = {
    color,
    background,
    text,
    border,
    padding,
    fontSize,
    hover,
  };

  return (
    <BadgeLayout onClick={onClick} {...styles}>
      {text ? text : children}
    </BadgeLayout>
  );
};

const BadgeLayout = styled.span`
  ${({ theme }) => {
    const { colors, fontSize } = theme;
    return css`
      &:hover {
        cursor: ${({ onClick }) => (onClick ? "pointer" : "")};
        background: ${(props) => (props.hover ? props.hover : "")};
      }
      color: ${(props) => (props.color ? props.color : colors.white)};
      background: ${(props) =>
        props.background ? props.background : colors.white};
      border: ${(props) => (props.border ? props.border : "none")};
      border-radius: 20px;
      padding: ${(props) => (props.padding ? props.padding : "5px 12px")};
      font-size: ${(props) =>
        props.fontSize ? props.fontSize : fontSize["14"]};
    `;
  }}
`;

export default GlobalBadge;
