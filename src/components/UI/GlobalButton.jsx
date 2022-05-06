import React from "react";
import styled, { css } from "styled-components";

const GlobalButton = (props) => {
  const { text, onClick, children, color, margin, background } = props;

  const styles = {
    margin: margin,
    color: color,
    background: background,
  };

  return (
    <Button {...styles} onClick={onClick}>
      {text ? text : children}
    </Button>
  );
};

GlobalButton.defaultProps = {
  children: null,
  text: false,
  background: false,
  onClick: () => {},
  color: "white",
  marginBottom: "12px",
};

const Button = styled.button`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      width: 100%;
      height: 50px;
      border-radius: 4px;
      ${(props) =>
        props.margin ? `margin: ${props.margin};` : "margin-bottom: 12px;"}
      font-size: ${calRem(16)};
      ${(props) =>
        props.color ? `color: ${props.color};` : `color: ${colors.white};`}
      ${(props) =>
        props.background
          ? `background: ${props.background};`
          : `background: ${colors.darkGrey};`}
      ${device.mobile} {
        height: 30px;
        font-size: ${calRem(12)};
      }
      &:hover {
        background: ${colors.mediumGrey};
      }
    `;
  }}//
`;
export default GlobalButton;
