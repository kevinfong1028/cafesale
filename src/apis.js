import axios from "axios";
console.log(import.meta.env);

// const API_BASE = import.meta.env.VITE_API_BASE;
// const API_PATH = import.meta.env.VITE_API_PATH;
// console.log("api base path", `${API_BASE}/${API_PATH}`);
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;
console.log("api base path", VITE_API_BASE);

const service = axios.create({
    baseURL: VITE_API_BASE,
    // responseType: "json",
});
// console.log("service.defaults.baseURL", service.defaults.baseURL);

service.interceptors.request.use(
    (config) => {
        // console.log("cookie raw:", document.cookie);
        // 在發送請求之前做一些處理，例如添加認證 token
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hexToken="))
            ?.split("=")[1];
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 對請求錯誤做一些處理
        return Promise.reject(error);
    },
);

service.interceptors.response.use(
    (response) => {
        // success
        console.log(
            "[AXIOS]",
            response.config.method.toUpperCase(),
            response.config.url,
            response.status,
        );
        return response;
    },
    (error) => {
        // failed
        console.log("[AXIOS Failed]", error);
        if (error.response && error.response.status === 401) {
            // 可以在這裡執行登出操作，或者重定向到登入頁面
            console.log("Unauthorized, redirecting to login...");
            // document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

const userApi = {
    login: (data) => service.post("/admin/signin", data),
    logout: () => {
        console.log("calling logout api");
        return service.post("/logout", {});
    },
    checkuser: () => service.get(`/api/user/check`),
};

const adminProductApi = {
    getAll: () => service.get(`/api/${VITE_API_PATH}/products/all`),
    getByPage: (p = 1) =>
        service.get(`/api/${VITE_API_PATH}/products?page=${p}`),
    add: (req) => service.post(`/api/${VITE_API_PATH}/product`, req),
    edit: (id, req) => service.put(`/api/${VITE_API_PATH}/product/${id}`, req),
    delete: (id) => service.delete(`/api/${VITE_API_PATH}/product/${id}`),
};

const productApi = {
    getAll: () => service.get(`/api/${VITE_API_PATH}/products/all`),
    getByPage: (p = 1) =>
        service.get(`/api/${VITE_API_PATH}/products?page=${p}`),
    getById: (id) => service.get(`/api/${VITE_API_PATH}/products/${id}`),
};

export { userApi, adminProductApi, productApi };
export default service;
