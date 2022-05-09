import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../apis/axios";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    instance
      .post(`${process.env.REACT_APP_API_JURI_URL}/user/kakao/callbak`, {
        grantCode: code,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code, navigate]);

  return <>kakao rediext</>;
};

export default KakaoRedirect;
