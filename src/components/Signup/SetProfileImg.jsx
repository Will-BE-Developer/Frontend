import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import test_img from "./test_img.jpg";

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

  return (
    <div>
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
      <button onClick={handleChangeImageBtn}>
        {getUrl ? "다른 사진 등록" : "프로필 사진 등록"}
      </button>
    </div>
  );
};

SetProfileImg.defaultProps = {
  img_src: test_img,
};

const Img = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

const Input = styled.input`
  display: none;
`;

export default SetProfileImg;
