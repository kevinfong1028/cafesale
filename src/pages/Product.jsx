import { useEffect, useState } from "react";
import { productApi } from "../apis";
import { useCart } from "../hooks";
import Modal from "../component/Modal";
import { useNavigate, Link, useParams } from "react-router";
import { scrollToTop, renderStars } from "../utils";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = "kevin-react";

export default function Products() {
    // useState;
    const [product, setProduct] = useState({});
    const [likeProducts, setLikeProducts] = useState([]);
    const [imageLoading, setImageLoading] = useState(true);
    const [productContent, setProductContent] = useState({});
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { id } = useParams();
    console.log("id =====", id);
    if (!id) return;

    const getThisProduct = async (id) => {
        try {
            const response = await productApi.getById(id);
            console.log("load product id:", id);
            if (response.data.success) {
                const p = response.data.product;
                setProduct(p);
                try {
                    setProductContent(JSON.parse(p.content));
                } catch {
                    setProductContent({});
                }
            }
        } catch (err) {
            console.error("Error fetching admin products:", err);
        }
    };

    const getRandomItems = (arr, n) => {
        const randomIndexes = new Set(); // 做三個不重複序號
        while (arr.length > n && randomIndexes.size < n) {
            randomIndexes.add(Math.floor(Math.random() * arr.length));
        }
        return [...randomIndexes].map((index) => arr[index]); // set解構後才是array
    };

    const getAllProducts = async () => {
        try {
            const response = await productApi.getAll();
            console.log("all products:", response);
            if (response.data.success) {
                console.log(response.data.products);
                const beyond = response.data.products.filter(
                    (p) => p.id !== product.id,
                );
                // const threeProducts = beyond.slice(-3);
                const threeProducts = getRandomItems(beyond, 3).map((p) => {
                    let parsedContent = {};
                    try {
                        parsedContent = JSON.parse(p.content);
                    } catch {}
                    return { ...p, parsedContent };
                });
                setLikeProducts(threeProducts);
                // console.log(allProducts);
            }
        } catch (err) {
            console.error("Error fetching admin products:", err);
        }
    };

    const decreaseNum = () => setQty((prev) => Math.max(prev - 1, 1));
    const increaseNum = () => setQty((prev) => prev + 1);

    const mapPopularityBadge = (count = 0) => {
        if (count >= 101)
            return (
                <span className="badge" style={{ backgroundColor: "#C0392B" }}>
                    火爆
                </span>
            );
        if (count >= 51)
            return (
                <span className="badge" style={{ backgroundColor: "#D4784A" }}>
                    熱銷
                </span>
            );
        return (
            <span className="badge" style={{ backgroundColor: "#5D7052" }}>
                關注
            </span>
        );
    };

    useEffect(() => {
        scrollToTop();
        setImageLoading(true);
        setProductContent({});
        setQty(1);
        getThisProduct(id);
        getAllProducts();
    }, [id]);

    return (
        <>
            {/* <div> Product Detail</div> */}

            {/* <!-- Breadcrumb --> */}
            <div
                style={{ padding: ".5rem 1.25rem", backgroundColor: "#f5f3f0" }}
            >
                <div className="container">
                    {/* <a
                        href="products.html"
                        className="text-decoration-none fw-bold"
                    >
                        ← 返回產品列表
                    </a> */}
                    <Link
                        to={"/products"}
                        className="text-decoration-none fw-bold"
                    >
                        ← 返回產品列表
                    </Link>
                </div>
            </div>

            {/* <!-- Product Detail --> */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* <!-- Image --> */}
                    <div className="col-lg-6">
                        <div className="detail-image">
                            {imageLoading && (
                                <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                    <div
                                        className="spinner-grow"
                                        style={{
                                            width: "3rem",
                                            height: "3rem",
                                        }}
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            載入中...
                                        </span>
                                    </div>
                                </div>
                            )}
                            <img
                                src={product.imageUrl}
                                alt={product.title || ""}
                                style={{
                                    display: imageLoading ? "none" : "block",
                                }}
                                onLoad={() => setImageLoading(false)}
                            />
                        </div>
                        {/* <div className="swiper-container mt-2"> */}
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={2}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 0,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }}
                            onSlideChange={() => console.log("slide change")}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {product.imagesUrl &&
                                product.imagesUrl.map((url, i) => (
                                    <SwiperSlide key={i}>
                                        <img
                                            src={url}
                                            alt={`${product.title} ${i + 1}`}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                        {/* </div> */}
                    </div>
                    {/* <!-- Info --> */}
                    <div className="col-lg-6">
                        <div className="mb-3">
                            {mapPopularityBadge(productContent.ratingCount)}
                        </div>

                        <h1 className="h2 fw-bold mb-3">{product.title}</h1>

                        <div className="detail-meta">
                            {productContent.origin && (
                                <span>{productContent.origin}</span>
                            )}
                            {productContent.roast && (
                                <span>{productContent.roast}</span>
                            )}
                            {productContent.process && (
                                <span>💧 {productContent.process}</span>
                            )}
                        </div>

                        {productContent.rating >= 0 &&
                            productContent.ratingCount > 0 && (
                                <div className="mb-3">
                                    <span className="text-warning">
                                        {renderStars(productContent.rating)}
                                    </span>
                                    <span className="text-muted small ms-1">
                                        ({productContent.ratingCount} 則評價)
                                    </span>
                                </div>
                            )}

                        <div className="detail-price">
                            NT${" "}
                            <del className="fs-4 text-secondary fw-normal fst-italic">
                                {product.origin_price || ""}
                            </del>{" "}
                            {product.price}
                        </div>

                        <p className="detail-description">
                            {product.description}
                        </p>

                        {Array.isArray(productContent.flavors) &&
                            productContent.flavors.length > 0 && (
                                <div className="detail-features">
                                    <h3 className="h6 fw-bold mb-3">
                                        風味特徵
                                    </h3>
                                    <ul className="features-list text-start">
                                        {productContent.flavors.map((f, i) => (
                                            <li key={i}>{f}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        <div className="bg-light p-3 rounded mb-4">
                            <h3 className="h6 fw-bold mb-3">產品資訊</h3>
                            <div className="row g-3 small">
                                {productContent.altitude && (
                                    <div className="col-6">
                                        <strong>海拔：</strong>{" "}
                                        {productContent.altitude}
                                    </div>
                                )}
                                {productContent.harvest && (
                                    <div className="col-6">
                                        <strong>採收季：</strong>{" "}
                                        {productContent.harvest}
                                    </div>
                                )}
                                {productContent.process && (
                                    <div className="col-6">
                                        <strong>處理法：</strong>{" "}
                                        {productContent.process}
                                    </div>
                                )}
                                {productContent.sca && (
                                    <div className="col-6">
                                        <strong>SCA 評分：</strong>{" "}
                                        {productContent.sca}
                                    </div>
                                )}
                                {/* <div className="col-6">
                                    <strong>烘焙日期：</strong> 新鮮烘焙
                                </div>
                                <div className="col-6">
                                    <strong>保存期限：</strong> 6 個月
                                </div> */}
                            </div>
                        </div>

                        {/* <!-- Quantity Selector --> */}
                        <div className="quantity-selector mb-4">
                            <label className="form-label">數量：</label>
                            <div className="quantity-input">
                                <button
                                    className="btn btn-light"
                                    onClick={decreaseNum}
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={qty}
                                    min="1"
                                    style={{
                                        width: "60px",
                                        border: "none",
                                        textAlign: "center",
                                    }}
                                    onChange={(e) => setQty(Math.max(Number(e.target.value), 1))}
                                />
                                <button
                                    className="btn btn-light"
                                    onClick={increaseNum}
                                >
                                    +
                                </button>
                            </div>
                            {product.num != null && (
                                <span className="text-muted small ms-2">
                                    庫存：{product.num} 包
                                </span>
                            )}
                        </div>

                        {/* <!-- Add to Cart Button --> */}
                        <button
                            className="add-to-cart-btn btn btn-primary btn-lg w-100 mb-4"
                            onClick={() =>
                                addToCart(
                                    product.id,
                                    product.title,
                                    qty,
                                )
                            }
                        >
                            🛒 加入購物車
                        </button>

                        {/* <!-- Additional Info --> */}
                        <div className="row g-4 text-center pt-4 border-top">
                            <div className="col-6 col-md-3">
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        marginBottom: "0.625rem",
                                    }}
                                >
                                    ✓
                                </div>
                                <div className="small fw-bold">有機認證</div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        marginBottom: "0.625rem",
                                    }}
                                >
                                    ⭐
                                </div>
                                <div className="small fw-bold">SCA 85+</div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        marginBottom: "0.625rem",
                                    }}
                                >
                                    🔥
                                </div>
                                <div className="small fw-bold">新鮮烘焙</div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        marginBottom: "0.625rem",
                                    }}
                                >
                                    🌍
                                </div>
                                <div className="small fw-bold">直接貿易</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Related Products --> */}
            <section
                style={{ backgroundColor: "#f5f3f0", padding: "3.75rem 0" }}
            >
                <div className="container">
                    <h2 className="h3 fw-bold mb-4">您可能也喜歡</h2>

                    <div className="products-grid">
                        {likeProducts.map((p) => (
                            <div
                                className="product-card"
                                key={p.id}
                                onClick={() => navigate(`/product/${p.id}`)}
                            >
                                <div className="product-image">
                                    <img src={p.imageUrl} alt={p.title} />
                                </div>
                                <div className="product-info">
                                    <div className="product-origin">
                                        {p.description}
                                    </div>
                                    <div className="product-name">
                                        {p.title}
                                    </div>
                                    {/* <div className="product-description">
                                        {p.content}
                                    </div> */}
                                    <div className="product-price">
                                        NT$ {p.price}
                                    </div>
                                    <div className="product-footer">
                                        {p.parsedContent?.ratingCount > 0 && (
                                            <span className="product-rating">
                                                {renderStars(
                                                    p.parsedContent.rating,
                                                )}{" "}
                                                ({p.parsedContent.ratingCount})
                                            </span>
                                        )}
                                        {/* <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                navigate(`/product/${p.id}`)
                                            }
                                        >
                                            詳情
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
