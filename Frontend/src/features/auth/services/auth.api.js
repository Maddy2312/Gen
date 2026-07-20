import axios from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export const registerUser = async (userData) => {
    try {
        const response = await authApi.post("/register", userData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default authApi;