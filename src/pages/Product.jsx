import { useEffect, useState } from "react";
import { productApi } from "../apis";
import { useCart } from "../hooks";
import Modal from "../component/Modal";
import { useNavigate, Link, useParams } from "react-router";
import { scrollToTop } from "../utils";

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = "kevin-react";

export default function Products() {
    // useState;
    const [product, setProduct] = useState({});
    const [likeProducts, setLikeProducts] = useState([]);
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
                setProduct(response.data.product);
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
                const threeProducts = getRandomItems(beyond, 3);
                console.log(threeProducts);
                setLikeProducts(threeProducts);
                // console.log(allProducts);
            }
        } catch (err) {
            console.error("Error fetching admin products:", err);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("change", type, checked, name, value);
        setProduct((prev) => {
            console.log("prev", prev);
            return {
                ...prev,
                [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
            };
        });
    };

    useEffect(() => {
        scrollToTop();
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
                            <img
                                src={product.imageUrl}
                                alt={`pic-${product.title}`}
                                className=" w-100X"
                            />
                        </div>
                    </div>

                    {/* <!-- Info --> */}
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <span
                                className="badge bg-secondary"
                                style={{
                                    backgroundColor:
                                        "var(--terracotta) !important",
                                }}
                            >
                                熱銷
                            </span>
                        </div>

                        <h1 className="h2 fw-bold mb-3">{product.title}</h1>

                        <div className="detail-meta">
                            <span>衣索比亞</span>
                            <span>淺烘焙</span>
                            <span>💧 水洗</span>
                        </div>

                        <div className="mb-3">
                            <span className="text-warning">⭐⭐⭐⭐⭐</span>
                            <span className="text-muted small">
                                (12 則評價)
                            </span>
                        </div>

                        <div className="detail-price">
                            NT$ <del>{product.origin_price || ""}</del>{" "}
                            {product.price}
                        </div>

                        <p className="detail-description">
                            {product.description}
                        </p>
                        {product.content}

                        <div className="detail-features">
                            <h3 className="h6 fw-bold mb-3">風味特徵</h3>
                            <ul className="features-list">
                                <li>茉莉花香</li>
                                <li>柑橘調性</li>
                                <li>蜂蜜甜感</li>
                                <li>清爽怡人</li>
                            </ul>
                        </div>

                        <div className="bg-light p-3 rounded mb-4">
                            <h3 className="h6 fw-bold mb-3">產品資訊</h3>
                            <div className="row g-3 small">
                                <div className="col-6">
                                    <strong>海拔：</strong> 1,800 - 2,200 m
                                </div>
                                <div className="col-6">
                                    <strong>採收季：</strong> 11 月 - 1 月
                                </div>
                                <div className="col-6">
                                    <strong>處理法：</strong> 水洗
                                </div>
                                <div className="col-6">
                                    <strong>SCA 評分：</strong> 85+
                                </div>
                                <div className="col-6">
                                    <strong>烘焙日期：</strong> 新鮮烘焙
                                </div>
                                <div className="col-6">
                                    <strong>保存期限：</strong> 6 個月
                                </div>
                            </div>
                        </div>

                        {/* <!-- Quantity Selector --> */}
                        <div className="quantity-selector mb-4">
                            <label className="form-label">數量：</label>
                            <div className="quantity-input">
                                <button className="btn btn-light">−</button>
                                <input
                                    type="number"
                                    name="num"
                                    className="form-control"
                                    value={product.num ?? 1}
                                    min="1"
                                    style={{
                                        width: "60px",
                                        border: "none",
                                        textAlign: "center",
                                    }}
                                    onChange={handleInputChange}
                                />
                                <button className="btn btn-light">+</button>
                            </div>
                            <span className="text-muted small ms-2">
                                庫存充足 (50 包)
                            </span>
                        </div>

                        {/* <!-- Add to Cart Button --> */}
                        <button
                            className="add-to-cart-btn btn btn-primary btn-lg w-100 mb-4"
                            onClick={() => addToCart(product.id, product.title, product.num ?? 1)}
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
                                        <span className="product-rating">
                                            ⭐⭐⭐⭐⭐ (8)
                                        </span>
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
