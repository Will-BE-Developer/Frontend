import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signinKakao } from "../store/slices/userSlice";
import Loader from "../components/UI/Loader";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");
  const error = new URL(window.location.href).searchParams.get("error");

  useEffect(() => {
    if (error) {
      navigate("/", { replace: true });
    }

    const singinDispatch = async () => {
      try {
        await dispatch(signinKakao(code)).unwrap();
        navigate("/", { replace: true });
      } catch (err) {
        alert("회원탈퇴 후 6개월간 재가입이 불가능합니다.");
      }
    };
    singinDispatch();
  }, [code, navigate, dispatch, error]);

  return <Loader />;
};
export default KakaoRedirect;
