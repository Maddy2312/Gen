import { useDispatch } from "react-redux";
import { createProductApi, sellerProductsApi, userProductsApi } from "../services/product.api.js";
import { setProducts, setSellerProducts } from "../state/product.slice.js";

const useProduct = () => {
    const dispatch = useDispatch();
    const handleCreateProduct = async (product) => {
        try {
            const data = await createProductApi(product);
            return data;
        } catch (error) {
            throw error;
        }
    }

    const handleSellerProducts = async() => {
        try {
            const data = await sellerProductsApi();
            dispatch(setSellerProducts(data.products))
            return data;
        } catch (error) {
            throw error;
        }
    }

    const handleUserProducts = async() => {
        try {
            const data = await userProductsApi();
            dispatch(setProducts(data.products))
            return data;
        } catch (error) {
            throw error;
        }
    }
    return {
        handleCreateProduct,
        handleSellerProducts,
        handleUserProducts
    }


}

export default useProduct;
