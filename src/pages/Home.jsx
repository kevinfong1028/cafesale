import { useEffect, useState } from "react";
import { productApi } from "../apis";
import { NavLink, Link } from "react-router";
import { useNavigate } from "react-router";
import { useCart } from "../hooks";

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        productApi.getAll().then((res) => {
            if (res.data.success) {
                const products = res.data.products;
                const shuffled = [...products].sort(() => Math.random() - 0.5);
                setFeaturedProducts(shuffled.slice(0, 3));
            }
        });
    }, []);

    return (
        <>
            {/* <!-- Hero Section --> */}
            <section className="hero">
                <div className="container">
                    <h1>每一顆豆，都是故事</h1>
                    <p>
                        從衣索比亞的高原到哥倫比亞的山谷，我們精選全球最優質的咖啡豆，以小批次手工烘焙，為您帶來最純粹的咖啡體驗。
                    </p>
                    <div className="hero-buttons">
                        <NavLink to="/products">
                            <button className="btn btn-primary">
                                探索咖啡豆
                            </button>
                        </NavLink>
                        <button className="btn btn-secondary">了解我們</button>
                    </div>
                </div>
            </section>

            {/* <!-- Featured Products --> */}
            <section className="py-5">
                <div className="container">
                    <h2
                        className="text-center mb-5"
                        style={{ fontSize: "2rem", fontWeight: "700" }}
                    >
                        本月推薦
                    </h2>

                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <div className="product-card" key={product.id}>
                                <div className="product-image">
                                    <img src={product.imageUrl} alt={product.title} />
                                </div>
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
                                        <button
                                            className="btn btn-primary btn-sm ms-auto"
                                            onClick={() =>
                                                navigate(
                                                    `/product/${product.id}`,
                                                )
                                            }
                                        >
                                            詳情
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                addToCart(
                                                    product.id,
                                                    product.title,
                                                )
                                            }
                                        >
                                            加入購物車
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5">
                        <Link to="/products">
                            <button className="btn btn-secondary">
                                查看全部產品
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* <!-- Features Section --> */}
            <section
                style={{ backgroundColor: "#F5F3F0", padding: "3.75rem 0" }}
            >
                <div className="container">
                    <div className="row g-4 text-center">
                        <div className="col-md-6 col-lg-3">
                            <div
                                style={{
                                    fontSize: "3rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                🌍
                            </div>
                            <h3 className="h5 fw-bold mb-2">20+ 產地國家</h3>
                            <p className="text-muted small">
                                精選全球最優質的咖啡豆產地
                            </p>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div
                                style={{
                                    fontSize: "3rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                ✨
                            </div>
                            <h3 className="h5 fw-bold mb-2">85+ SCA 評分</h3>
                            <p className="text-muted small">
                                所有產品均達國際精品咖啡標準
                            </p>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div
                                style={{
                                    fontSize: "3rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                🔥
                            </div>
                            <h3 className="h5 fw-bold mb-2">小批次烘焙</h3>
                            <p className="text-muted small">
                                新鮮手工烘焙，保留最佳風味
                            </p>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div
                                style={{
                                    fontSize: "3rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                ❤️
                            </div>
                            <h3 className="h5 fw-bold mb-2">500+ 滿意顧客</h3>
                            <p className="text-muted small">
                                超過五百位咖啡愛好者的信任
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Testimonials Section --> */}
            <section className="py-5">
                <div className="container">
                    <h2
                        className="text-center mb-5"
                        style={{ fontSize: "2rem", fontWeight: "700" }}
                    >
                        顧客怎麼說
                    </h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="testimonial-card">
                                <div className="testimonial-rating">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <p className="testimonial-text">
                                    「耶加雪菲的花香與柑橘調性真的讓我驚艷，第一次喝到這麼清爽又有層次的咖啡。每次沖泡都像在享受一個小儀式。」
                                </p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">陳</div>
                                    <div>
                                        <div className="testimonial-name">
                                            陳小姐
                                        </div>
                                        <div className="testimonial-location">
                                            台北市
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="testimonial-card">
                                <div className="testimonial-rating">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <p className="testimonial-text">
                                    「每次收到豆子都超新鮮，香氣撲鼻。比起超市的咖啡豆，真的是完全不同的世界。而且包裝很細心，非常值得。」
                                </p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">王</div>
                                    <div>
                                        <div className="testimonial-name">
                                            王先生
                                        </div>
                                        <div className="testimonial-location">
                                            新竹市
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="testimonial-card">
                                <div className="testimonial-rating">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <p className="testimonial-text">
                                    「肯亞 AA
                                    的紅莓風味讓我一試成主顧，品質穩定又可靠。每個月固定訂購，已經回購超過半年了，強力推薦！」
                                </p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">林</div>
                                    <div>
                                        <div className="testimonial-name">
                                            林先生
                                        </div>
                                        <div className="testimonial-location">
                                            台中市
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Footer --> */}
        </>
    );
}
