import React from "react";
import styled, { css } from "styled-components";

const GlobalButton = (props) => {
  const {
    text,
    onClick,
    children,
    color,
    margin,
    background,
    padding,
    width,
    border,
  } = props;

  const styles = {
    margin,
    color,
    background,
    padding,
    width,
    border,
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
  padding: false,
  width: false,
  border: false,
  onClick: () => {},
  color: "white",
  marginBottom: "12px",
};

const Button = styled.button`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      width: ${(props) => (props.width ? props.width : "max-content")}
      height: 50px;
      border-radius: 4px;
      border: ${(props) => (props.border ? props.border : "none")}
      padding: ${(props) => (props.padding ? props.padding : "11px 18px")}
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
