import { Link } from "react-router";

export default function About() {
    return (
        <>
            {/* Hero */}
            <div className="about-hero">
                <div className="container">
                    <h1>關於 Bean & Brew</h1>
                    <p>我們致力於為咖啡愛好者帶來世界各地最優質的精品咖啡豆，每一包都承載著我們對咖啡文化的熱情與執著。</p>
                </div>
            </div>

            <main className="container">
                {/* 我們的故事 */}
                <section className="about-section">
                    <h2>我們的故事</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p>Bean & Brew 成立於 2018 年，源自於創辦人對咖啡的深厚熱愛。我們相信，每一杯咖啡都應該是一次品味之旅，而不僅僅是一杯飲料。</p>
                            <p>從最初的小型咖啡館到現在的線上精品咖啡豆專賣店，我們始終堅持選擇最優質的咖啡豆。我們與世界各地的小農場建立長期合作關係，確保每一批咖啡豆都符合我們的高標準。</p>
                            <p>我們的使命是讓每個人都能享受到真正的精品咖啡，無論他們身在何處。通過教育、品質和熱情，我們正在改變人們對咖啡的認識。</p>
                        </div>
                        <div className="about-image"><img src="https://images.unsplash.com/photo-1715424584663-d793ce153a03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="about-us-image" className="img-fuild" /></div>
                    </div>
                </section>

                {/* 我們的價值觀 */}
                <section className="about-section">
                    <h2>我們的價值觀</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="icon">🌱</div>
                            <h3>永續發展</h3>
                            <p>我們致力於環保的咖啡種植和包裝方式，為下一代保護地球。</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">⭐</div>
                            <h3>品質第一</h3>
                            <p>每一包咖啡豆都經過嚴格的品質檢測，確保最佳風味。</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">🤝</div>
                            <h3>公平貿易</h3>
                            <p>我們支持公平貿易，確保農民獲得應有的報酬。</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">❤️</div>
                            <h3>熱情服務</h3>
                            <p>我們用心對待每一位客戶，提供專業的咖啡建議。</p>
                        </div>
                    </div>
                </section>

                {/* 數據統計 */}
                <section className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>2,500+</h3>
                            <p>滿意客戶</p>
                        </div>
                        <div className="stat-item">
                            <h3>15+</h3>
                            <p>咖啡產地</p>
                        </div>
                        <div className="stat-item">
                            <h3>6 年</h3>
                            <p>行業經驗</p>
                        </div>
                        <div className="stat-item">
                            <h3>100%</h3>
                            <p>品質保證</p>
                        </div>
                    </div>
                </section>

                {/* 我們的團隊 */}
                <section className="about-section">
                    <h2>我們的團隊</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="team-member-avatar">☕</div>
                            <div className="team-member-info">
                                <div className="team-member-name">李明軒</div>
                                <div className="team-member-role">創辦人 & CEO</div>
                                <div className="team-member-bio">咖啡烘焙師，擁有 15 年的咖啡行業經驗，致力於推廣精品咖啡文化。</div>
                            </div>
                        </div>
                        <div className="team-member">
                            <div className="team-member-avatar">🌍</div>
                            <div className="team-member-info">
                                <div className="team-member-name">王美琪</div>
                                <div className="team-member-role">採購經理</div>
                                <div className="team-member-bio">與全球咖啡農場建立合作關係，確保咖啡豆的品質和新鮮度。</div>
                            </div>
                        </div>
                        <div className="team-member">
                            <div className="team-member-avatar">🎯</div>
                            <div className="team-member-info">
                                <div className="team-member-name">陳俊傑</div>
                                <div className="team-member-role">品質控制主任</div>
                                <div className="team-member-bio">確保每一批咖啡豆都達到最高標準，為客戶提供最佳品質。</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 發展歷程 */}
                <section className="about-section">
                    <h2>發展歷程</h2>
                    <div className="timeline">
                        {[
                            { year: "2018", title: "Bean & Brew 成立", desc: "在台北開設第一間咖啡館，開始我們的咖啡之旅。" },
                            { year: "2019", title: "推出線上商店", desc: "開設線上精品咖啡豆販售平台，服務全台灣客戶。" },
                            { year: "2020", title: "國際合作擴展", desc: "與衣索比亞、哥倫比亞等地的咖啡農場建立長期合作。" },
                            { year: "2022", title: "獲得認證", desc: "獲得國際公平貿易認證，成為認證的公平貿易咖啡商。" },
                            { year: "2024", title: "持續創新", desc: "推出新的烘焙工藝和客製化服務，滿足更多客戶需求。" },
                        ].map(({ year, title, desc }) => (
                            <div className="timeline-item" key={year}>
                                <div className="timeline-year">{year}</div>
                                <div className="timeline-content">
                                    <h3>{title}</h3>
                                    <p>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="cta-section">
                    <h2>開始您的咖啡之旅</h2>
                    <p>探索我們精選的咖啡豆，找到您最喜愛的風味。</p>
                    <Link to="/products" className="btn btn-primary px-4 py-2">
                        瀏覽產品
                    </Link>
                </section>
            </main>
        </>
    );
}
