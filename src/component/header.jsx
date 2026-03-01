import { useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login,logout } from "../store/slice/userSlice";
import { userApi } from "../apis";

export default function Header() {
    // const [isLogin, setIsLogin] = useState(false);
    const [cartCount, setCartCount] = useState(1);
    const user = useSelector((state) => state.user);
    console.log("user", user);
    const storeUser = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const checkUserLogin = () => {
        console.log("checkUserLogin", storeUser);
        if (storeUser.isLoggedIn) return;

        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hexToken="))
            ?.split("=")[1];
        // return !!token; // 如果有 token 就回傳 true，否則回傳 false

        if (!!token) {
            console.log('yes')
            dispatch(login({ token }));
        } else {
            console.log('no')
            // dispatch(logout());
        }
    };
    checkUserLogin();

    const signOut = () => {
        userApi
            .logout()
            .then((res) => {
                console.log("logout res", res);
                if (res.data.success) {
                    // 登出成功
                    console.log("登出成功:", res.data);
                    document.cookie =
                        "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // setIsLogin(false);
                    dispatch(logout());
                } else {
                    // 登出失敗
                    console.error("登出失敗:", res.data?.message);
                }
            })
            .catch((error) => {
                console.error("登出過程中發生錯誤:", error);
            });
    };

    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <a className="navbar-brand" href="index.html">
                        Bean & Brew
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                {/* <a className="nav-link" href="index.html">首頁</a> */}
                                <NavLink className="nav-link" to="/">
                                    首頁
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/about">
                                    about
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/products">
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/cart">
                                    Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/contact">
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/admin">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/admin/order">
                                    Order
                                </NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="about.html">
                                    關於我們
                                </a>
                            </li> */}
                        </ul>
                        <div className="d-flex align-items-center ms-3">
                            {/* <a href="cart.html" className="cart-icon">
                                🛒
                                <span className="cart-count">0</span>
                            </a> */}
                            <NavLink to="/cart" className="cart-icon">
                                🛒
                                <span className="cart-count">{cartCount}</span>
                            </NavLink>
                            {/* <NavLink
                                className="btn btn-primary btn-sm ms-2 nav-linkX"
                                to="/login"
                            >
                                {user.isLoggedIn ? "管理登出" : "管理登入"}
                            </NavLink> */}
                            {user.isLoggedIn ? (
                                <button
                                    className="btn btn-secondary btn-sm ms-2"
                                    onClick={() => signOut()}
                                >
                                    管理登出
                                </button>
                            ) : (
                                <NavLink
                                    className="btn btn-primary btn-sm ms-2 nav-linkX"
                                    to="/login"
                                >
                                    {user.isLoggedIn ? "管理登出" : "管理登入"}
                                </NavLink>
                            )}
                            {/* <button className="btn btn-primary btn-sm ms-2">
                                管理登入
                            </button> */}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
