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
    _fontSize,
    mPadding,
    mMargin,
    mWidth,
    mHeight,
    isHover,
    radius,
    hoverBg,
    hoverColor,
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
    _fontSize,
    mPadding,
    mMargin,
    mWidth,
    mHeight,
    radius,
    hoverBg,
    hoverColor,
  };

  return (
    <Button disabled={disabled} {...styles} onClick={onClick}>
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
  hoverBg: false,
  _fontSize: false,
  onClick: () => {},
  color: "white",
  marginBottom: "12px",
  disabled: false,
  mPadding: false,
  mMargin: false,
  mWidth: false,
  mHeight: false,
};

const Button = styled.button`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${(props) => (props._width ? props._width : "max-content")};
      height: ${(props) => (props._height ? props._height : "50px")};
      border-radius: ${(props) => (props.radius ? props.radius : "8px")};
      border: ${(props) => (props.border ? props.border : "")};
      padding: ${(props) => (props.padding ? props.padding : "11px 18px")};
      margin: ${(props) => (props.margin ? props.margin : "")};
      font-size: ${(props) =>
        props._fontSize ? calRem(props._fontSize) : calRem(14)};
      color: ${(props) => (props.color ? props.color : colors.white)};
      background: ${(props) =>
        props.background ? props.background : colors.darkGrey};
      ${device.mobile} {
        height: 40px;
        padding: ${(props) => (props.mPadding ? props.mPadding : "0px 16px")};
        margin: ${(props) => (props.mMargin ? props.mMargin : "")};
        width: ${(props) => (props.mWidth ? props.mWidth : "")};
        height: ${(props) => (props.mHeight ? props.mHeight : "")};
      }
      &:hover {
        background: ${(props) => (props.hoverBg ? props.hoverBg : "")};
        color: ${(props) => (props.hoverColor ? props.hoverColor : "")};
      }

      :disabled {
        background-color: ${colors.grey10};
        border-color: ${colors.grey10};
        color: ${colors.grey50};
        &:hover {
          cursor: not-allowed;
        }
      }
    `;
  }}//
`;
export default GlobalButton;
