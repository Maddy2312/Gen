import { useDispatch } from "react-redux";
import { createProductApi } from "../services/product.api.js";

const useProduct = () => {
    const dispatch = useDispatch();
    const createProduct = async (product) => {
        try {
            const response = await createProductApi(product);
            return response;
        } catch (error) {
            throw error;
        }
    }
    return {
        createProduct
    }
}

export default useProduct;
