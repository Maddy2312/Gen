import { useDispatch } from "react-redux";
import { addItemToCart } from "../services/cart.api.js";


const useCart = () => {
    const dispatch = useDispatch();
    const handleAddToCart = async (productId, variantId) => {
        try {
            const response = await addItemToCart(productId, variantId);
            return response;
        } catch (error) {
            throw error;
        }
    };
    return { handleAddToCart };
}

export default useCart