import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice/userSlice";
import { setCartCount } from "../store/slice/cartSlice";
import { userApi, cartApi } from "../apis";
import axios from "axios";
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function Header() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const cartCount = useSelector((state) => state.cart.cartCount);
    console.log("user @store", user);
    const storeUser = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        cartApi.get().then((res) => {
            if (res.data.success) {
                dispatch(setCartCount(res.data.data.carts.length));
            }
        }).catch(() => {});
    }, []);

    const signOut = async () => {
        try {
            const rep = await userApi.logout();
            console.log("logout response", rep);
        } catch (error) {
            console.log("logout failed", error);
        } finally {
            document.cookie =
                "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch(logout());
            navigate("/");
        }
        return;

        userApi
            .logout()
            .then((res) => {
                console.log("logout res", res);
                return;

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
                    <NavLink className="navbar-brand" to="/">
                        Bean & Brew
                    </NavLink>
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
                                    關於B&B
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/products">
                                    商品
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/cart">
                                    購物車
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/contact">
                                    聯絡我們
                                </NavLink>
                            </li>
                            {user.isLoggedIn && (
                                <>
                                    {/* <li>
                                        <NavLink
                                            className="nav-link"
                                            to="/admin"
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink
                                            className="nav-link"
                                            to="/admin/products"
                                        >
                                            商品管理
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="nav-link"
                                            to="/admin/order"
                                        >
                                            訂單
                                        </NavLink>
                                    </li>
                                </>
                            )}
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
