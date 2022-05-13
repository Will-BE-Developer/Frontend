import { ro } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GlobalTextArea = (props) => {
  const { charLimit, rows, cols, placeHolder, _value } = props;

  const [isError, setIsError] = useState(false);

  const [remainingChars, setRemainingChars] = useState(0);

  useEffect(() => {
    if (remainingChars === 50) {
      setIsError(true);
    }
  }, [remainingChars, isError]);

  const inputHandler = (e) => {
    console.log("object");
    const value = e.target.value;
    const characterCount = value?.length;
    setRemainingChars(characterCount);
    setIsError(false);
  };
  return (
    <>
      <TextArea
        value={_value}
        rows={rows}
        cols={cols}
        maxLength={charLimit}
        placeholder={placeHolder}
        onChange={inputHandler}
      />
      <ErrorMSG>{isError && "글자 수를 초과하였습니다."}</ErrorMSG>
      <div style={{ textAlign: "right", fontSize: "14px" }}>
        {remainingChars} / {charLimit}
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
