import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signinKakao } from "../store/slices/userSlice";
import Loader from "../components/UI/Loader";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const singinDispatch = async () => {
      try {
        await dispatch(signinKakao(code)).unwrap();
        navigate("/", { replace: true });
      } catch (err) {
        console.log(err);
      }
    };
    singinDispatch();
  }, [code, navigate, dispatch]);

  return <Loader />;
};
export default KakaoRedirect;
