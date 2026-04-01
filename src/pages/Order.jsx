import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { cartApi, orderApi } from "../apis";
import { setCartCount } from "../store/slice/cartSlice";
import { scrollToTop } from "../utils";

export default function Order() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cart, setCart] = useState({ carts: [], total: 0, final_total: 0 });
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getCart = async () => {
        try {
            const res = await cartApi.get();
            if (res.data.success) setCart(res.data.data);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    useEffect(() => {
        scrollToTop();
        getCart();
    }, []);

    const onSubmit = async (formData) => {
        try {
            setLoading(true);
            const res = await orderApi.add({
                user: {
                    name: formData.name,
                    email: formData.email,
                    tel: formData.tel,
                    address: formData.address,
                },
                message: formData.message,
            });
            if (res.data.success) {
                setOrderId(res.data.orderId);
                await cartApi.deleteAll();
                dispatch(setCartCount(0));
                scrollToTop();
                setIsSuccess(true);
            }
        } catch (err) {
            console.error("Error submitting order:", err);
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="container py-5 text-center">
                <div style={{ fontSize: "4rem" }}>✅</div>
                <h2 className="h3 fw-bold mt-3 mb-2">訂單已成立！</h2>
                <p className="text-muted mb-1">感謝您的購買</p>
                <p className="text-muted mb-4">
                    訂單編號：
                    <span className="fw-bold text-dark">{orderId}</span>
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/products")}
                >
                    繼續購物
                </button>
            </div>
        );
    }

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
                    <h1 className="h2 fw-bold mb-2">訂單結算</h1>
                    <p className="text-muted">確認您的訂購資訊</p>
                </div>
            </section>

            <div className="container py-5">
                <div className="row g-4">
                    {/* Order Summary */}
                    <div className="col-lg-7">
                        <h2 className="h5 fw-bold mb-3">訂單摘要</h2>

                        {cart.carts.map((item) => (
                            <div
                                key={item.id}
                                className="card border-0 shadow-sm mb-3"
                            >
                                <div className="card-body">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-3 col-md-2">
                                            {item.product?.imageUrl ? (
                                                <img
                                                    src={item.product.imageUrl}
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
                                        <div className="col-6 col-md-7">
                                            <h3 className="h6 fw-bold mb-1">
                                                {item.product?.title}
                                            </h3>
                                            <p className="text-muted small mb-0">
                                                x {item.qty}
                                            </p>
                                        </div>
                                        <div className="col-3 text-end">
                                            <span className="fw-bold">
                                                NT$ {item.final_total || item.total}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">小計</span>
                                    <span>NT$ {cart.total}</span>
                                </div>
                                {cart.total !== cart.final_total && (
                                    <div className="d-flex justify-content-between mb-2 text-danger">
                                        <span>折扣</span>
                                        <span>
                                            − NT$ {cart.total - cart.final_total}
                                        </span>
                                    </div>
                                )}
                                <hr />
                                <div className="d-flex justify-content-between fw-bold">
                                    <span>總計</span>
                                    <span>NT$ {cart.final_total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="col-lg-5">
                        <h2 className="h5 fw-bold mb-3">收件人資訊</h2>
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            姓名{" "}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            placeholder="請輸入姓名"
                                            {...register("name", {
                                                required: "請輸入姓名",
                                            })}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email{" "}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                            placeholder="請輸入 Email"
                                            {...register("email", {
                                                required: "請輸入 Email",
                                                pattern: {
                                                    value: /^\S+@\S+\.\S+$/i,
                                                    message: "Email 格式不正確",
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            電話{" "}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                                            placeholder="請輸入電話"
                                            {...register("tel", {
                                                required: "請輸入電話",
                                                pattern: {
                                                    value: /^[0-9]{8,10}$/,
                                                    message: "電話格式不正確（8～10碼數字）",
                                                },
                                            })}
                                        />
                                        {errors.tel && (
                                            <div className="invalid-feedback">
                                                {errors.tel.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            地址{" "}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                            placeholder="請輸入地址"
                                            {...register("address", {
                                                required: "請輸入地址",
                                            })}
                                        />
                                        {errors.address && (
                                            <div className="invalid-feedback">
                                                {errors.address.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">
                                            備註
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            placeholder="有什麼特殊需求嗎？（選填）"
                                            {...register("message")}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >
                                        {loading ? "處理中..." : "送出訂單"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
