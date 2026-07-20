import { useDispatch } from "react-redux";
import { registerUser } from "../services/auth.api.js";
import { setUser } from "../state/auth.slice.js";

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

  return {
    handleRegister,
  };
};

export default useAuth;
