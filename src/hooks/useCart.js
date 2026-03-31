import { cartApi } from "../apis";
import useMsg from "./useMsg";

export default function useCart() {
    const { showSuccess, showError } = useMsg();

    const addToCart = async (product_id, title, qty = 1) => {
        try {
            const response = await cartApi.add({ product_id, qty });
            if (response.data.success) {
                showSuccess(`${title} 已加入購物車`);
            } else {
                showError(response.data.message || "加入失敗");
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
            showError("加入購物車失敗，請稍後再試");
        }
    };

    return { addToCart };
}
