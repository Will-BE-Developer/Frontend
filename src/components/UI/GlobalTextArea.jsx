import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const GlobalTextArea = (props) => {
  const CHAR_LIMIT = props.charLimit;
  const ROWS = props.rows;
  const COLS = props.cols;
  const PLACEHOLDER = props.placeholder;

  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState("");

  const [remainingChars, setRemainingChars] = useState(CHAR_LIMIT);

  useEffect(() => {
    if (remainingChars <= 0) {
      setRemainingChars(0);
      setIsError(true);
    }
  }, [remainingChars, isError]);

  const inputHandler = (e) => {
    setValue(e.target.value);
    const characterCount = value?.length;
    setRemainingChars(parseInt(CHAR_LIMIT, 10) - parseInt(characterCount, 10));

    setIsError(false);
  };
  return (
    <>
      <TextArea
        rows={ROWS}
        cols={COLS}
        maxLength={CHAR_LIMIT}
        placeholder={PLACEHOLDER}
        onChange={inputHandler}
        value={value}
      />
      <ErrorMSG>{isError && "글자 수를 초과하였습니다."}</ErrorMSG>
      <div style={{ textAlign: "right", fontSize: "14px" }}>
        {remainingChars} / {CHAR_LIMIT}
      </div>
    </>
  );
};

const TextArea = styled.textarea`
  height: 100px;
  width: 100%;
  resize: none;
  overflow: auto;
  border: 1px solid lightgrey;
  margin: 5px 0;
  padding: 10px;

  ::placeholder {
    font-size: ${({ theme }) => theme.calRem(16)};
    font-weight: lighter;
    color: ${({ theme }) => theme.colors.placeHolder};
  }

  ${({ theme }) => theme.device.mobile} {
    padding: 12px;
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
