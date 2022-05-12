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
    _width,
    _height,
    border,
    hover,
    disabled,
  } = props;

  const styles = {
    margin,
    color,
    background,
    padding,
    _width,
    _height,
    border,
    hover,
    disabled,
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
  _width: false,
  _height: false,
  border: false,
  hover: false,
  onClick: () => {},
  color: "white",
  marginBottom: "12px",
  disabled: false,
};

const Button = styled.button`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      :disabled: ${(props) => (props.disabled ? true : false)};
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${(props) => (props._width ? props._width : "max-content")};
      height: ${(props) => (props._height ? props._height : "50px")};
      border-radius: 8px;
      border: ${(props) => (props.border ? props.border : "")};
      padding: ${(props) => (props.padding ? props.padding : "11px 18px")};
      margin: ${(props) => (props.margin ? props.margin : "")};
      font-size: ${calRem(14)};
      color: ${(props) => (props.color ? props.color : colors.white)};
      background: ${(props) =>
        props.background ? props.background : colors.darkGrey};
      ${device.mobile} {
        height: 40px;
        padding: ${(props) => (props.padding ? props.padding : "0px 16px")};
      }
      &:hover {
        background: ${(props) =>
          props.hover ? colors.mediumGrey : props.background};
      }
    `;
  }}//
`;
export default GlobalButton;
