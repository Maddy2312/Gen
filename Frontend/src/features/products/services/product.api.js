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

export const sellerProductsApi = async() => {
    try {
        const response = await productApiInstance.get("/seller");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const userProductsApi = async() => {
    try {
        const response = await productApiInstance.get("/user");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createVariantApi = async(variant, id) => {
    try {
        const response = await productApiInstance.post(`/${id}/variants`, variant);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProductByIdApi = async(id) => {
    try {
        const response = await productApiInstance.get(`/getProduct/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
