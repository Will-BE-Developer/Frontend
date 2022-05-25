import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GlobalTextArea = (props) => {
  const {
    charLimit,
    rows,
    cols,
    placeHolder,
    value,
    onChange,
    onKeyPress,
    _width,
    _height,
    border,
    background,
  } = props;

  const styles = { _width, _height, border, background };
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (parseInt(value?.length) === parseInt(charLimit)) {
      setIsError(true);
      return;
    }
  }, [charLimit, value?.length]);

  const inputHandler = (e) => {
    onChange(e);
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
      />
      <Div>
        {value?.length} / {charLimit}
      </Div>
      <ErrorMSG>{isError && `글자 수는 ${charLimit}자로 제한됩니다.`}</ErrorMSG>
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
  disabled: false,
};
const TextArea = styled.textarea`
  white-space: pre;
  width: ${(props) => (props._width ? props._width : " 100%")};
  height: ${(props) => (props._height ? props._height : "100px")};
  background: ${(props) => (props.background ? props.background : "")};
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

const Div = styled.span`
  text-align: left;
  font-size: 14px;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.grey80};
`;

const ErrorMSG = styled.span`
  font-size: ${({ theme }) => theme.calRem(12)};
  color: ${({ theme }) => theme.colors.errorMsg};
`;

export default GlobalTextArea;
