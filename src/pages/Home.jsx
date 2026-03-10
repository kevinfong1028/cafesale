import { useEffect, useState } from "react";
import { productApi} from "../apis";
import { Outlet, NavLink } from "react-router";

export default function Home() {
    // useState;
    useEffect(() => {
        productApi.getAll().then((res) => {
            console.log("productApi res", res);
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
                        <a href="products.html">
                            <button className="btn btn-primary">
                                探索咖啡豆
                            </button>
                        </a>
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
                        {/* <!-- Product 1 --> */}
                        <div className="product-card">
                            <div className="product-image">☕</div>
                            <div className="product-info">
                                <div className="product-origin">衣索比亞</div>
                                <div className="product-name">耶加雪菲</div>
                                <div className="product-description">
                                    花香與柑橘調性，清爽怡人
                                </div>
                                <div className="product-price">NT$ 680</div>
                                <div className="product-footer">
                                    <span className="product-rating">
                                        ⭐⭐⭐⭐⭐ (12)
                                    </span>
                                    <button className="btn btn-primary btn-sm">
                                        加入購物車
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Product 2 --> */}
                        <div className="product-card">
                            <div className="product-image">☕</div>
                            <div className="product-info">
                                <div className="product-origin">哥倫比亞</div>
                                <div className="product-name">薇拉</div>
                                <div className="product-description">
                                    巧克力與堅果香氣，醇厚順滑
                                </div>
                                <div className="product-price">NT$ 620</div>
                                <div className="product-footer">
                                    <span className="product-rating">
                                        ⭐⭐⭐⭐⭐ (8)
                                    </span>
                                    <button className="btn btn-primary btn-sm">
                                        加入購物車
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Product 3 --> */}
                        <div className="product-card">
                            <div className="product-image">☕</div>
                            <div className="product-info">
                                <div className="product-origin">肯亞</div>
                                <div className="product-name">AA 頂級</div>
                                <div className="product-description">
                                    紅莓與黑醋栗香，複雜迷人
                                </div>
                                <div className="product-price">NT$ 780</div>
                                <div className="product-footer">
                                    <span className="product-rating">
                                        ⭐⭐⭐⭐⭐ (15)
                                    </span>
                                    <button className="btn btn-primary btn-sm">
                                        加入購物車
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <a href="products.html">
                            <button className="btn btn-secondary">
                                查看全部產品
                            </button>
                        </a>
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

            {/* <!-- Footer --> */}
            <footer>
                <div className="container">
                    <div className="row g-4 mb-4">
                        <div className="col-md-6 col-lg-3">
                            <h5>Bean & Brew</h5>
                            <p className="small" style={{ lineHeight: "1.8" }}>
                                致力於帶給咖啡愛好者最純粹的精品咖啡體驗。每一顆豆都經過精心挑選與烘焙。
                            </p>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <h5>快速連結</h5>
                            <ul className="list-unstyled small">
                                <li>
                                    <a href="index.html">首頁</a>
                                </li>
                                <li>
                                    <a href="products.html">產品</a>
                                </li>
                                <li>
                                    <a href="about.html">關於我們</a>
                                </li>
                                <li>
                                    <a href="contact.html">聯絡我們</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <h5>聯絡方式</h5>
                            <ul className="list-unstyled small">
                                <li>📧 info@beanbrew.com</li>
                                <li>📱 (02) 1234-5678</li>
                                <li>📍 台北市中山區</li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <h5>追蹤我們</h5>
                            <ul className="list-unstyled small">
                                <li>
                                    <a href="#">Facebook</a>
                                </li>
                                <li>
                                    <a href="#">Instagram</a>
                                </li>
                                <li>
                                    <a href="#">Twitter</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Bean & Brew. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}
