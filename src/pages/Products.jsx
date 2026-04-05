import { useEffect, useMemo, useState } from "react";
import { productApi } from "../apis";
import { useCart } from "../hooks";
import { useNavigate } from "react-router";
import { renderStars } from "../utils";

export default function Products() {
    const [allProducts, setAllProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const getProducts = async () => {
        try {
            const response = await productApi.getAll();
            if (response.data.success) {
                setAllProducts(response.data.products);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const categories = useMemo(() => {
        return [...new Set(allProducts.map((p) => p.category).filter(Boolean))]; // 預防 category 為 falsy 的情況
    }, [allProducts]);

    const toggleCategory = (cat) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
        );
    };

    const filteredProducts = useMemo(() => {
        return allProducts.filter((product) => {
            const keyword = searchText.toLowerCase();
            const matchSearch =
                keyword === "" ||
                product.title?.toLowerCase().includes(keyword) ||
                product.description?.toLowerCase().includes(keyword);
            const matchCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);
            return matchSearch && matchCategory;
        });
    }, [allProducts, searchText, selectedCategories]);

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
                                placeholder="搜尋產品名稱、風味描述..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label d-block">
                                產區：
                            </label>
                            <div className="filter-tags">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`filter-tag ${selectedCategories.includes(cat) ? "active" : ""}`}
                                        onClick={() => toggleCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-muted small mb-4">
                    共 {filteredProducts.length} 款產品
                </p>

                {/* <!-- Products Grid --> */}
                <div className="products-grid">
                    {filteredProducts.map((product) => {
                        let parsedContent = {};
                        try { parsedContent = JSON.parse(product.content); } catch {}
                        return (
                        <div className="product-card" key={product.id}>
                            <div className="product-image"><img src={product.imageUrl} alt={product.title} /></div>
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
                                    {parsedContent.ratingCount > 0 && (
                                        <span className="product-rating">
                                            {renderStars(parsedContent.rating)} ({parsedContent.ratingCount})
                                        </span>
                                    )}
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
                                        onClick={() =>
                                            addToCart(product.id, product.title)
                                        }
                                    >
                                        加入購物車
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                    })}
                </div>
            </div>
        </>
    );
}
