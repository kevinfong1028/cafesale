import { useEffect, useState } from "react";
import { productApi } from "../apis";
import { useCart } from "../hooks";
import { useNavigate } from "react-router";

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = "kevin-react";

export default function Products() {
    // useState;
    const [prouductList, setProductList] = useState([]);
    const [pagination, setPagination] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const getProducts = async (page = 1, category = "") => {
        try {
            const response = await productApi.getByPage({
                page,
                category,
            });
            console.log("load products", response.data);
            if (response.data.success) {
                setProductList(response.data.products);
                setPagination(response.data.pagination);
            }
        } catch (err) {
            console.error("Error fetching admin products:", err);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div>Admin Products</div>

            {/* <!-- Page Header --> */}
            <section
                style={{
                    background:
                        "linear-gradient(135deg, rgba(93, 112, 82, 0.1) 0%, rgba(193, 140, 93, 0.05) 100%)",
                    padding: "2.5rem 0",
                }}
            >
                <div className="container">
                    <h1 className="h2 fw-bold mb-2">精品咖啡豆</h1>
                    <p className="text-muted">
                        精選來自全球各地的單品咖啡豆，每一款都有其獨特的風土故事。
                    </p>
                </div>
            </section>

            {/* <!-- Main Content --> */}
            <div className="container py-5">
                {/* <!-- Filter Section --> */}
                <div className="filter-section">
                    <div className="row g-3 mb-3">
                        <div className="col-12 col-md-6">
                            <label className="form-label">搜尋：</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="搜尋產品名稱、產地、風味..."
                            />
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label d-block">
                                烘焙度：
                            </label>
                            <div className="filter-tags">
                                <button className="filter-tag active">
                                    全部烘焙
                                </button>
                                <button className="filter-tag">淺烘焙</button>
                                <button className="filter-tag">中烘焙</button>
                                <button className="filter-tag">中深烘焙</button>
                                <button className="filter-tag">深烘焙</button>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label">產地：</label>
                            <select className="form-select">
                                <option>全部產地</option>
                                <option>衣索比亞</option>
                                <option>哥倫比亞</option>
                                <option>肯亞</option>
                                <option>瓜地馬拉</option>
                                <option>巴西</option>
                                <option>巴拿馬</option>
                            </select>
                        </div>
                    </div>
                </div>

                <p className="text-muted small mb-4">共 6 款產品</p>

                {/* <!-- Products Grid --> */}
                <div className="products-grid">
                    {prouductList.map((product) => (
                        <div className="product-card" key={product.id}>
                            <div className="product-image">☕</div>
                            <div className="product-info">
                                <div className="product-origin">
                                    {product.category}
                                </div>
                                <div className="product-name">
                                    {product.title}
                                </div>
                                <div className="product-description">
                                    {product.description}
                                </div>
                                <div className="product-price">
                                    NT$ {product.price}
                                </div>
                                <div className="product-footer">
                                    <span className="product-rating d-none">
                                        ⭐⭐⭐⭐⭐ (12)
                                    </span>
                                    {/* <a href="product-detail.html?id=1"> */}
                                    <button
                                        className="btn btn-primary btn-sm ms-auto"
                                        onClick={(e) => {
                                            navigate(`/product/${product.id}`);
                                        }}
                                    >
                                        詳情
                                    </button>
                                    {/* </a> */}
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => addToCart(product.id, product.title)}
                                    >
                                        加入購物車
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
