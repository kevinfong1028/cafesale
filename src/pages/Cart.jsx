import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { cartApi } from "../apis";
import { setCartCount } from "../store/slice/cartSlice";
import { scrollToTop } from "../utils";

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cart, setCart] = useState({ carts: [], total: 0, final_total: 0 });
    const [loading, setLoading] = useState(false);

    const getCart = async () => {
        try {
            const response = await cartApi.get();
            if (response.data.success) {
                setCart(response.data.data);
                dispatch(setCartCount(response.data.data.carts.length));
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    const updateQty = async (cartItem, qty) => {
        if (qty < 1) return;
        try {
            await cartApi.edit(cartItem.id, {
                product_id: cartItem.product_id,
                qty,
            });
            getCart();
        } catch (err) {
            console.error("Error updating cart item:", err);
        }
    };

    const removeItem = async (id) => {
        try {
            setLoading(true);
            await cartApi.delete(id);
            getCart();
        } catch (err) {
            console.error("Error removing cart item:", err);
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            await cartApi.deleteAll();
            getCart();
        } catch (err) {
            console.error("Error clearing cart:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        scrollToTop();
        getCart();
    }, []);

    const isEmpty = !cart.carts || cart.carts.length === 0;

    return (
        <>
            {/* Page Header */}
            <section
                style={{
                    background:
                        "linear-gradient(135deg, rgba(93, 112, 82, 0.1) 0%, rgba(193, 140, 93, 0.05) 100%)",
                    padding: "2.5rem 0",
                }}
            >
                <div className="container">
                    <h1 className="h2 fw-bold mb-2">購物車</h1>
                    <p className="text-muted">確認您的選購商品</p>
                </div>
            </section>

            <div className="container py-5">
                {isEmpty ? (
                    <div className="text-center py-5">
                        <div style={{ fontSize: "4rem" }}>🛒</div>
                        <h2 className="h4 fw-bold mt-3 mb-2">購物車是空的</h2>
                        <p className="text-muted mb-4">
                            快去挑選喜歡的咖啡豆吧！
                        </p>
                        <Link to="/products" className="btn btn-primary">
                            前往選購
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {/* Cart Items */}
                        <div className="col-lg-8">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="h5 fw-bold mb-0">
                                    共 {cart.carts.length} 項商品
                                </h2>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={clearCart}
                                    disabled={loading}
                                >
                                    清空購物車
                                </button>
                            </div>

                            {cart.carts.map((item) => (
                                <div
                                    key={item.id}
                                    className="card mb-3 border-0 shadow-sm"
                                >
                                    <div className="card-body">
                                        <div className="row g-3 align-items-center">
                                            {/* Image */}
                                            <div className="col-3 col-md-2">
                                                {item.product?.imageUrl ? (
                                                    <img
                                                        src={
                                                            item.product
                                                                .imageUrl
                                                        }
                                                        alt={item.product.title}
                                                        className="img-fluid rounded"
                                                        style={{
                                                            aspectRatio: "1",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="rounded d-flex align-items-center justify-content-center bg-light"
                                                        style={{
                                                            aspectRatio: "1",
                                                            fontSize: "2rem",
                                                        }}
                                                    >
                                                        ☕
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="col-9 col-md-5">
                                                <h3 className="h6 fw-bold mb-1">
                                                    {item.product?.title}
                                                </h3>
                                                <p className="text-muted small mb-0">
                                                    {item.product?.category}
                                                </p>
                                                <p className="small mb-0">
                                                    NT$ {item.product?.price} /
                                                    份
                                                </p>
                                            </div>

                                            {/* Quantity */}
                                            <div className="col-6 col-md-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <button
                                                        className="btn btn-light btn-sm"
                                                        onClick={() =>
                                                            updateQty(
                                                                item,
                                                                item.qty - 1,
                                                            )
                                                        }
                                                        disabled={item.qty <= 1}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-2">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        className="btn btn-light btn-sm"
                                                        onClick={() =>
                                                            updateQty(
                                                                item,
                                                                item.qty + 1,
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Subtotal + Delete */}
                                            <div className="col-6 col-md-2 text-end">
                                                <p className="fw-bold mb-1">
                                                    NT${" "}
                                                    {item.final_total ||
                                                        item.total}
                                                </p>
                                                <button
                                                    className="btn btn-link text-danger p-0 small"
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    disabled={loading}
                                                >
                                                    移除
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-3">
                                <Link
                                    to="/products"
                                    className="text-decoration-none fw-bold"
                                >
                                    ← 繼續購物
                                </Link>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h2 className="h5 fw-bold mb-4">
                                        訂單摘要
                                    </h2>

                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">小計</span>
                                        <span>NT$ {cart.total}</span>
                                    </div>

                                    {cart.total !== cart.final_total && (
                                        <div className="d-flex justify-content-between mb-2 text-danger">
                                            <span>折扣</span>
                                            <span>
                                                − NT${" "}
                                                {cart.total - cart.final_total}
                                            </span>
                                        </div>
                                    )}

                                    <hr />

                                    <div className="d-flex justify-content-between fw-bold mb-4">
                                        <span>總計</span>
                                        <span>NT$ {cart.final_total}</span>
                                    </div>

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => navigate("/order")}
                                    >
                                        前往結帳
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
