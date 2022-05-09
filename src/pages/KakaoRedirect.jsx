import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../apis/axios";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  console.log(code);

  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_JURI_URL}/user/kakao/callback`, {
        params: {
          code,
        },
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
