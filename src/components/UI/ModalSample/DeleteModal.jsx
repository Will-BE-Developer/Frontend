import { useState } from "react";
import Modal from "../GlobalModal";
import styled, { css } from "styled-components";
import { IoAlertCircle } from "react-icons/io5";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const OTHER_CONTENT_STYLES = {
  position: "relative",
  zIndex: 2,
  backgroundColor: "red",
  padding: "10px",
};

export default function DeleteModal() {
  const [openModal, setOpenModal] = useState(false);
  const [isConfirm, setIsConfirmModal] = useState(false);
  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log("clicked")}>
        <button onClick={() => setOpenModal(true)}>Open Modal</button>

        <Modal
          title="삭제"
          confirmText="삭제"
          open={openModal}
          onClose={() => setOpenModal(false)}
          isConfirm
          isIcon
          icon={<AlertIcon />}
        >
          영상을 정말 삭제하시겠습니까?
        </Modal>
      </div>

      <div style={OTHER_CONTENT_STYLES}>Other Content</div>
    </>
  );
}

const AlertIcon = styled(IoAlertCircle)`
  font-size: 24px;
  color: #ec5959;
`;
