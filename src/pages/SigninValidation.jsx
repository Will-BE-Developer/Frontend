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
    const singinDispatch = async () => {
      try {
        await dispatch(emailValidation({ token, email })).unwrap();
        navigate("/signup", { replace: true, state: 3 });
      } catch (err) {
        console.log(err);
        return navigate("/", { replace: true });
      }
    };
    singinDispatch();
  }, [navigate, dispatch, token, email]);

  return <Loader />;
};

export default SigninValidation;
