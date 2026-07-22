import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/products",
    withCredentials: true,
});

export const createProductApi = async(product) => {
    try {
        const response = await productApiInstance.post("/create", product);
        return response.data;
    } catch (error) {
        throw error;
    }
}