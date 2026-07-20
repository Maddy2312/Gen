import { useDispatch } from "react-redux";
import { registerUser, loginUser, getUser } from "../services/auth.api.js";
import { setUser, setLoading, setError } from "../state/auth.slice.js";

const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (userData) => {
    try {
      const data = await registerUser(userData);
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleLogin = async (userData) => {
    try {
      const data = await loginUser(userData);
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleGetUser = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getUser();
      dispatch(setUser(data.user));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleGetUser,
  };
};

export default useAuth;
