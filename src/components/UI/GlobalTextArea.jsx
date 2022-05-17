import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const GlobalTextArea = (props) => {
  const {
    charLimit,
    rows,
    cols,
    placeHolder,
    value,
    onChange,
    onKeyPress,
    sendResetRemainingHandler,
    _width,
    _height,
    border,
  } = props;

  const styles = { _width, _height, border };
  const [isError, setIsError] = useState(false);

  const [remainingChars, setRemainingChars] = useState(
    charLimit - value?.length
  );

  // if (value?.length === 0) {
  //   setRemainingChars(charLimit - value?.length);
  // }

  useEffect(() => {
    if (remainingChars <= 0) {
      setRemainingChars(0);
      setIsError(true);
    }
  }, [remainingChars, isError]);

  const inputHandler = (e) => {
    onChange(e);
    const value = e.target.value;
    const characterCount = value?.length;
    setRemainingChars(parseInt(charLimit, 10) - parseInt(characterCount, 10));

    setIsError(false);
  };

  return (
    <>
      <TextArea
        {...styles}
        value={value}
        rows={rows}
        cols={cols}
        maxLength={charLimit}
        placeholder={placeHolder}
        onChange={inputHandler}
        onKeyPress={onKeyPress}
        sendResetRemainingHandler={sendResetRemainingHandler}
      />
      <ErrorMSG>{isError && "글자 수를 초과하였습니다."}</ErrorMSG>
      <div style={{ textAlign: "left", fontSize: "14px", color: "#6D727C" }}>
        {remainingChars} / {charLimit}
      </div>
    </>
  );
};

GlobalTextArea.defaultProps = {
  background: false,
  padding: false,
  _width: false,
  _height: false,
  border: false,
  hover: false,
  hoverBg: false,
  // _fontSize: false,
  // onClick: () => {},
  // color: "white",
  // marginBottom: "12px",
  // disabled: false,
  // mPadding: false,
  // mMargin: false,
  // mWidth: false,
  // mHeight: false,
};
const TextArea = styled.textarea`
  white-space: pre;
  width: ${(props) => (props._width ? props._width : " 100%")};
  height: ${(props) => (props._height ? props._height : "100px")};

  resize: none;
  overflow: auto;
  border: ${(props) => (props.border ? props.border : " 1px solid lightgrey")};
  margin-top: 5px;
  ::placeholder {
    font-size: ${({ theme }) => theme.calRem(14)};
    font-weight: lighter;
    color: ${({ theme }) => theme.colors.placeHolder};
  }
  ${({ theme }) => theme.device.mobile} {
    padding: 0 5%;
    width: 100%;
    height: 50px;
    ::placeholder {
      color: ${({ theme }) => theme.colors.placeHolder};
      font-size: ${({ theme }) => theme.calRem(12)};
    }
  }
`;

const ErrorMSG = styled.span`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.calRem(12)};
  color: ${({ theme }) => theme.colors.errorMsg};
  margin-bottom: 16px;
`;

export default GlobalTextArea;
