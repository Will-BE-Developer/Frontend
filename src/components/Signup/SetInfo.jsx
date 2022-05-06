import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SetProfileImg from "./SetProfileImg";

import { instance } from "../../apis/axios";

const SetInfo = (props) => {
  // 받아온 src url
  const [imgUrl, setImgUrl] = useState("");
  const [getUrl, setGetUrl] = useState("");
  // const getImageRef = useRef(null);
  const navigate = useNavigate();

  const currentPage = props.currentPage;

  const getImgUrl = (url) => {
    setImgUrl(url);
  };

  // 다음 페이지
  const nextPageHandler = () => {
    props.setCurrentPage(currentPage + 1);
  };

  const previousPageHandler = () => {
    props.setCurrentPage(currentPage - 1);
  };

  const s3PutPresignedUrl = async () => {
    try {
      const res = await instance.get("/s3url-put", {
        params: {
          objKey: "kellyImg",
        },
      });

      return res.data;
    } catch (err) {
      console.log(err.response);
    }
  };

  // 프로필사진 보내기
  const nextPageWithUploadImgHandler = async () => {
    props.setCurrentPage(currentPage + 1);
    // 여기서 프로필 현재 프로필사진 s3에 업로드하기

    const s3Url = await s3PutPresignedUrl();
    // s3Url 넣어서 업로드하기.
    try {
      const res = await instance.put(s3Url, imgUrl);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    getImgFromS3();
  };

  // get presigned url받고 영상받는 핸들러
  //
  const getImgFromS3 = async () => {
    const res = await instance.get("/s3url-get", {
      params: {
        objKey: "kellyImg",
      },
    });

    const s3Url = res.data;

    const getRealImgAxios = await instance.get(s3Url);

    const realImgUrl = getRealImgAxios.data;

    setGetUrl(realImgUrl);
  };

  const linkToHomeHandler = () => {
    navigate("/");
  };

  return (
    <div>
      {currentPage === 2 && (
        <BG>
          <Container>
            <h2>사용하실 닉네임을 설정해주세요.</h2>
            <div>서비스를 이용할 때 사용되는 이름이에요!</div>
            <div>
              <input type="text" placeholder="2-6자 이내로 입력해주세요." />
            </div>
            <p>닉네임은 공백 없이 한글/영문/숫자만 가능합니다. </p>
            <button onClick={nextPageHandler}>다음으로</button>
          </Container>
        </BG>
      )}

      {currentPage === 3 && (
        <BG>
          <Container>
            <button onClick={previousPageHandler}>뒤로가기</button>
            <h2>프로필 사진을 설정해주세요.</h2>
            <div>서비스를 이용할 때 사용되는 이미지에요!</div>
            <div>
              <SetProfileImg sendImgUrl={getImgUrl} getUrl={getUrl} />
            </div>
            <p>PNG, JPG파일만 업로드 가능합니다. </p>
            <button onClick={nextPageWithUploadImgHandler}>다음으로</button>
          </Container>
        </BG>
      )}

      {currentPage === 4 && (
        <BG>
          <Container>
            <button onClick={previousPageHandler}>뒤로가기</button>

            <h2>Github링크를 넣어주세요</h2>
            <div>개발자들끼리 서로 공유해요!</div>
            <input type="text" placeholder="https://github.com/" />
            <h2>본인을 소개하는 한줄!</h2>
            <textarea />
            {/* 이메일로 가입한사람은 로그인창으로 가야함.. */}
            {/* 회원가입할 떄 토큰 내려달라고 하기 바로 로그인.. */}
            <button onClick={linkToHomeHandler}>홈페이지로 가기</button>
          </Container>
        </BG>
      )}
    </div>
  );
};

const BG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
`;

// wrap?
const Container = styled.div`
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  width: 400px;
  padding: 4rem;
  background-color: white;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;
export default SetInfo;
