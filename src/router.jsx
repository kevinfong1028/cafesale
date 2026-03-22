import FrontLayout from "./pages/FrontLayout";
import BackLayout from "./pages/BackLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import AdminProducts from "./pages/AdminProducts";
import Order from "./pages/Order";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import { redirect } from "react-router";
import { userApi } from "./apis";
import store from "./store";
import { login, logout } from "./store/slice/userSlice";

// 前台：同步登入狀態，失敗不跳轉
const frontLoader = async () => {
    try {
        const res = await userApi.checkUser();
        if (res.data.success) store.dispatch(login(res.data));
    } catch {
        store.dispatch(logout());
    }
    return null;
};

// 後台：驗證失敗強制跳轉 login
const backLoader = async () => {
    try {
        const res = await userApi.checkUser();
        if (res.data.success) store.dispatch(login(res.data));
        return res;
    } catch {
        throw redirect("/login");
    }
};

const routes = [
    { path: "/login", element: <Login /> },
    {
        path: "/",
        element: <FrontLayout />,
        loader: frontLoader,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "products", element: <Products /> },
            { path: "cart", element: <Cart /> },
            { path: "contact", element: <Contact /> },
        ],
    },
    {
        path: "/admin",
        element: <BackLayout />,
        loader: backLoader,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "products", element: <AdminProducts /> },
            { path: "order", element: <Order /> },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

export default routes;
