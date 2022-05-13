import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slices/userSlice";

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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
