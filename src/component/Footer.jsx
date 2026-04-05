import { NavLink } from "react-router";

export const Footer = () => {
    return (
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
                                <NavLink to="/">首頁</NavLink>
                            </li>
                            <li>
                                <NavLink to="/products">產品</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">關於我們</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">聯絡我們</NavLink>
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
    );
};
