import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slices/userSlice";
import { getCookie } from "../../shared/cookies";

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = getCookie("token");

  if (!token) {
    return <></>;
  }

  if (!user) {
    try {
      const fetchUser = async () => {
        await dispatch(getUser()).unwrap();
      };
      fetchUser();
      return <></>;
    } catch (err) {
      console.log(err);
    }
  }

  return children;
};

export default RequireAuth;
