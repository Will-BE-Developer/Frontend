import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
const GlobalModal = (props) => {
  const {
    title,
    open,
    onClose,
    onConfirm,
    children,
    padding,
    _width,
    _height,
    _mobileHeight,
    hover,
    onClick,
    confirmText,
    isConfirm,
    isIcon,
    icon,
  } = props;

  const styles = {
    padding,
    _width,
    _height,
    hover,
    _mobileHeight,
  };

  // useEffect(() => {
  //   document.body.style.cssText = `
  //     position: fixed;
  //     top: -${window.scrollY}px;
  //     overflow-y: scroll;
  //     width: 100%;`;
  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = "";
  //     window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  //   };
  // }, []);

  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <Overlay {...styles} onClick={onClick} />
      <ModalContainer {...styles}>
        <Wrap>
          <Header>
            <div className="title_box">
              {isIcon && <div className="icon">{icon}</div>}
              <div className="title">{title}</div>
            </div>
            <div className="close_box" onClick={onClose}>
              <CloseIcon />
            </div>
          </Header>
          <Body>{children}</Body>
          <Footer>
            <button className="close_btn" onClick={onClose}>
              닫기
            </button>
            {isConfirm && (
              <button className="confirm_btn" onClick={onConfirm}>
                {confirmText}
              </button>
            )}
          </Footer>
        </Wrap>
      </ModalContainer>
    </>,
    document.getElementById("portal")
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      position: fixed;
      min-width: 478px;
      min-height: 228px;
      width: ${(props) => (props._width ? props._width : "max-content")};
      height: ${(props) => (props._height ? props._height : "228px")};
      padding: ${(props) => (props.padding ? props.padding : "20px")};
      margin: ${(props) => (props.margin ? props.margin : "")};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      z-index: 1000;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04),
        0px 8px 32px rgba(0, 0, 0, 0.08);
      border-radius: 8px;

      ${device.mobile} {
        min-width: 350px;
        min-height: 40px;
        height: ${(props) =>
          props._mobileHeight ? props._mobileHeight : "228px"};
        padding: ${(props) => (props.padding ? props.padding : "20px")};
      }
    `;
  }}
`;

const CloseIcon = styled(AiOutlineClose)`
  color: black;
  font-size: 18px;
`;

const Wrap = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;
`;

const Header = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  & .title_box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;

    & .title {
      font-size: 16px;
      font-weight: 600;
    }
  }
  & .close_box {
    cursor: pointer;
  }
`;

const Body = styled.div`
  padding: 30px 0;
  flex-grow: 3;
  height: 50%;

  ${({ theme }) => theme.device.mobile} {
    padding: 10px 0;
  }
`;
const Footer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  button {
    cursor: pointer;
    padding: 8px 18px;

    border: 1px solid #e6e9f1;
    border-radius: 8px;

    ${({ theme }) => theme.device.mobile} {
      padding: 2px 10px;
    }
  }
  & .close_btn {
  }

  & .confirm_btn {
    background: #ec5959;
    color: #fff;
  }
`;
export default GlobalModal;
