import { useDispatch } from "react-redux";
import { addItemToCart, getCart } from "../services/cart.api.js";
import { setCart } from "../state/cart.slice.js";

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

    const handleGetCart = async () => {
        try {
            const response = await getCart();
            dispatch(setCart(response.cart));
            return response;
        } catch (error) {
            throw error;
        }
    }
    return { handleAddToCart, handleGetCart };
}

export default useCart