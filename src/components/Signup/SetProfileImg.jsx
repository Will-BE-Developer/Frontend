import React, { useRef } from "react";

import defaultUserImage from "../../assets/defaultUserImage.png";
import styled, { css } from "styled-components";
import GlobalButton from "../UI/GlobalButton";
import theme from "../../styles/theme";

const SetProfileImg = (props) => {
  const { getImage, image, isEdit } = props;
  const inputFileRef = useRef(null);

  const handleImageUrl = (event) => {
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filetype = ["png", "PNG", "jpg", "JPG", "jpeg", "gif"];
    if (!filetype.includes(fileExt)) {
      alert("PNG, JPG, GiF 파일만 업로드 가능합니다.");
      return;
    }
    setFileReader(file);
  };

  const setFileReader = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(file);
      getImage({ image: reader.result, file });
    };
  };

  const handleChangeImageBtn = (e) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  const deleteImgHandler = (e) => {
    e.preventDefault();
    getImage(null);
  };

  return (
    <Div isedit="true">
      <Img
        isedit="true"
        alt="not found"
        width={"200px"}
        src={image ? image : defaultUserImage}
      />
      <Input
        type="file"
        name="myImage"
        ref={inputFileRef}
        onChange={handleImageUrl}
      />
      <div isedit="true" className="btnWrapper">
        {isEdit ? (
          <>
            <GlobalButton
              text="사진 편집"
              margin="0px 10px 0px 0px"
              background={theme.colors.white}
              color={theme.colors.blue}
              border={`1px solid ${theme.colors.blue}`}
              _height="40px"
              onClick={handleChangeImageBtn}
              hover=" rgba(86, 127, 232, 0.06)"
            />
            <GlobalButton
              text="사진 삭제"
              margin="0px 10px 0px 0px"
              background={theme.colors.white}
              color={theme.colors.black}
              border={`1px solid ${theme.colors.blue}`}
              _height="40px"
              hover
              onClick={deleteImgHandler}
            />
          </>
        ) : (
          <>
            <GlobalButton
              onClick={handleChangeImageBtn}
              margin="0 8px 6px 0"
              _height="40px"
              mHeight="30px"
              border={`1px solid ${theme.colors.main}`}
              background={theme.colors.white}
              color={theme.colors.main}
              hover=" rgba(86, 127, 232, 0.06)"
            >
              {getImage ? "사진 편집" : "사진 등록"}
            </GlobalButton>
            <GlobalButton
              onClick={deleteImgHandler}
              margin="0 0 6px 0"
              _height="40px"
              mHeight="30px"
              hover=" #F4F6F9;"
              border={`1px solid ${theme.colors.grey10}`}
              background={theme.colors.white}
              color={theme.colors.grey80}
            >
              사진 삭제
            </GlobalButton>
          </>
        )}
      </div>
    </Div>
  );
};

SetProfileImg.defaultProps = {
  img_src: defaultUserImage,
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ isedit }) => (isedit ? "column" : "")};

  width: 100%;

  & .btnWrapper {
    display: flex;
    flex-direction: ${({ isedit }) => (isedit ? "row" : "column")};
    margin-top: ${({ isedit }) => (isedit ? "20px" : "")};
  }
`;

const Button = styled.button`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      border-radius: 4px;
      background: ${colors.darkGrey};
      color: ${colors.white};
      width: 96px;
      height: 60px;
      font-size: ${calRem(16)};
      margin: 0 0 6px 0;

      ${device.mobile} {
        width: 80px;
        height: 30px;
        font-size: ${calRem(12)};
      }
      &:hover {
        background: ${colors.mediumGrey};
      }
    `;
  }}
`;

const Img = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  /* width: ${({ isedit }) => (isedit ? "160px" : "120px")};
  height: ${({ isedit }) => (isedit ? "160px" : "120px")}; */
`;

const Input = styled.input`
  display: none;
`;

export default SetProfileImg;
