import { useState } from "react";
import { isMobile } from "react-device-detect";
import { IoAlertCircle } from "react-icons/io5";
import styled from "styled-components";
import GlobalModal from "../GlobalModal";

const IsMobileModal = ({ confirmHandler }) => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      {isMobile && (
        <GlobalModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            confirmHandler();
          }}
          title="안내문"
          _width="350px"
          _height="250px"
          btnHeight="50px"
          hover
          isIcon
          icon={<AlertIcon />}
        >
          모바일의 경우 녹화가 정상적으로 동작하지 않을 수 있습니다.
        </GlobalModal>
      )}
    </>
  );
};

const AlertIcon = styled(IoAlertCircle)`
  font-size: 24px;
  color: #ec5959;
`;

export default IsMobileModal;
