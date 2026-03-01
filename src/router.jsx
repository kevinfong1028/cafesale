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

const routes = [
    {
        path: "/",
        element: <FrontLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "products", element: <Products /> },
            { path: "cart", element: <Cart /> },
            { path: "contact", element: <Contact /> },
            { path: "login", element: <Login /> },
        ],
    },
    {
        path: "/admin",
        element: <BackLayout />,
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
