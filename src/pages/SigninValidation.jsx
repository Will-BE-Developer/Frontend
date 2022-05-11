import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emailValidation } from "../store/slices/userSlice";
import Loader from "../components/UI/Loader";

const SigninValidation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = new URL(window.location.href).searchParams.get("token");
  const email = new URL(window.location.href).searchParams.get("email");

  useEffect(() => {
    // const url = `${process.env.REACT_APP_API_JURI_URL}/login/validation`;

    const singinDispatch = async () => {
      try {
        await dispatch(emailValidation({ token, email })).unwrap();
        navigate("/", { replace: true });
      } catch (err) {
        console.log(err.response);
        navigate("/signin", { replace: true });
        alert("로그인에 실패하였습니다");
      }
    };
    singinDispatch();
  }, [navigate, dispatch, token, email]);

  return <Loader />;
};

export default SigninValidation;
