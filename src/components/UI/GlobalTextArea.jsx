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
  } = props;

  console.log(value.length);
  const [isError, setIsError] = useState(false);

  const [remainingChars, setRemainingChars] = useState(
    charLimit - value?.length
  );

  // if (value?.length === 0) {
  //   setRemainingChars(charLimit - value?.length);
  // }
  console.log(remainingChars);

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
      <div style={{ textAlign: "right", fontSize: "14px" }}>
        {remainingChars} / {charLimit}
      </div>
    </>
  );
};

const TextArea = styled.textarea`
  white-space: pre;
  height: 100px;
  width: 100%;
  resize: none;
  overflow: auto;
  border: 1px solid lightgrey;
  margin: 5px 0;
  ::placeholder {
    font-size: ${({ theme }) => theme.calRem(16)};
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
