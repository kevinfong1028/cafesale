import { useState } from "react";

export default function Products() {
    // useState;
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
                                <a href="product-detail.html?id=1">
                                    <button className="btn btn-primary btn-sm">
                                        詳情
                                    </button>
                                </a>
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
                                <a href="product-detail.html?id=2">
                                    <button className="btn btn-primary btn-sm">
                                        詳情
                                    </button>
                                </a>
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
                                <a href="product-detail.html?id=3">
                                    <button className="btn btn-primary btn-sm">
                                        詳情
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product 4 --> */}
                    <div className="product-card">
                        <div className="product-image">☕</div>
                        <div className="product-info">
                            <div className="product-origin">瓜地馬拉</div>
                            <div className="product-name">安提瓜</div>
                            <div className="product-description">
                                煙燻與香料香，厚重飽滿
                            </div>
                            <div className="product-price">NT$ 650</div>
                            <div className="product-footer">
                                <span className="product-rating">
                                    ⭐⭐⭐⭐ (10)
                                </span>
                                <a href="product-detail.html?id=4">
                                    <button className="btn btn-primary btn-sm">
                                        詳情
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product 5 --> */}
                    <div className="product-card">
                        <div className="product-image">☕</div>
                        <div className="product-info">
                            <div className="product-origin">巴西</div>
                            <div className="product-name">塞拉多</div>
                            <div className="product-description">
                                焦糖與堅果香，溫暖舒適
                            </div>
                            <div className="product-price">NT$ 560</div>
                            <div className="product-footer">
                                <span className="product-rating">
                                    ⭐⭐⭐⭐⭐ (20)
                                </span>
                                <a href="product-detail.html?id=5">
                                    <button className="btn btn-primary btn-sm">
                                        詳情
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product 6 --> */}
                    <div className="product-card">
                        <div className="product-image">☕</div>
                        <div className="product-info">
                            <div className="product-origin">巴拿馬</div>
                            <div className="product-name">藝妓</div>
                            <div className="product-description">
                                花香與熱帶水果，優雅複雜
                            </div>
                            <div className="product-price">NT$ 1,580</div>
                            <div className="product-footer">
                                <span className="product-rating">
                                    ⭐⭐⭐⭐⭐ (5)
                                </span>
                                <a href="product-detail.html?id=6">
                                    <button className="btn btn-primary btn-sm">
                                        詳情
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
