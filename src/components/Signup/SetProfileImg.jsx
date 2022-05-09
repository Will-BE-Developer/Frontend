import React, { useState, useRef, useEffect } from "react";

import test_img from "./test_img.jpg";
import styled, { css } from "styled-components";
import GlobalButton from "../UI/GlobalButton";

const SetProfileImg = (props) => {
  // 기본이미지
  const { img_src } = props;

  // FileReader변환함
  const [selectedImage, setSelectedImage] = useState(null);
  // preview 이미지
  const [preview, setPreview] = useState(null);
  // 업로드파일 ref
  const inputFileRef = useRef(null);

  // SignUp으로 이미지 보내기
  const sendImgUrl = props.sendImgUrl;

  // SignUp에서 업로드 가공된 이미지 받아오기
  const getUrl = props.getUrl;

  useEffect(() => {
    if (selectedImage) {
      sendImgUrl(selectedImage);
    }
  }, [sendImgUrl, selectedImage]);

  const handleImageUrl = (event) => {
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filetype = ["png", "PNG", "jpg", "JPG", "jpeg"];
    if (!filetype.includes(fileExt)) {
      alert("jpg, png 파일만 Upload 가능합니다.");
      return;
    }
    setPreview(file);
    setFileReader(file);
  };

  // file to FileReader
  const setFileReader = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  // 업로드파일 클릭시 발생되는 함수
  const handleChangeImageBtn = (e) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  const DeleteImgHandler = (e) => {
    e.preventDefault();
    setSelectedImage(null);
  };

  return (
    <Div>
      <div>
        <Img
          alt="not fount"
          width={"250px"}
          src={
            selectedImage
              ? URL.createObjectURL(preview)
              : getUrl
              ? getUrl
              : img_src
          }
        />
      </div>

      <Input
        type="file"
        name="myImage"
        ref={inputFileRef}
        onChange={handleImageUrl}
      />

      <div className="flex_colum">
        <GlobalButton
          onClick={handleChangeImageBtn}
          margin="0 0 6px 0"
          _height="30px"
          hover
        >
          {getUrl ? "다른 사진 등록" : "사진 등록"}
        </GlobalButton>

        <GlobalButton
          onClick={DeleteImgHandler}
          margin="0 0 6px 0"
          _height="30px"
          hover
        >
          사진 삭제
        </GlobalButton>
      </div>
    </Div>
  );
};

SetProfileImg.defaultProps = {
  img_src: test_img,
};

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  & .flex_colum {
    display: flex;
    flex-direction: column;
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
  width: 80px;
  height: 80px;
`;

const Input = styled.input`
  display: none;
`;

export default SetProfileImg;
