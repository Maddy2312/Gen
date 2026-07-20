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

export const loginUser = async (userData) => {
    try {
        const response = await authApi.post("/login", userData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUser = async () => {
    try {
        const response = await authApi.get("/getUser");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default authApi;