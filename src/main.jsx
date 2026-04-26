
if (import.meta.env.PROD) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
}
import { createRoot } from "react-dom/client";
import "bootstrap/scss/bootstrap.scss"; // all styles
import "./assets/style.css";
import "./assets/all.scss";
import "bootstrap";

import { RouterProvider } from "react-router";
import { router } from "./router";

import store from "./store/index.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider
            router={router}
            hydrateFallback={
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">載入中...</span>
                    </div>
                </div>
            }
        />
    </Provider>,
);
