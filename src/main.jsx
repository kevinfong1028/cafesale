import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/scss/bootstrap.scss"; // all styles
import "./assets/style.css";
import "./assets/all.scss";
import "bootstrap";

// router
import { createHashRouter, RouterProvider } from "react-router";
import routes from "./router";
const router = createHashRouter(routes);

import store from "./store/index.js";
import { Provider } from "react-redux";

// import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        {/* <StrictMode> */}
        <RouterProvider router={router} />
        {/* <App /> */}
        {/* </StrictMode>, */}
    </Provider>,
);
