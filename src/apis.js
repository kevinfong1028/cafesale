import axios from "axios";
// import { router } from "./main";
// console.log(import.meta.env);

// const API_BASE = import.meta.env.VITE_API_BASE;
// const API_PATH = import.meta.env.VITE_API_PATH;
// console.log("api base path", `${API_BASE}/${API_PATH}`);
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;
// console.log("api base path", VITE_API_BASE);

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
            config.headers["Authorization"] = token;
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
        return Promise.reject(error);
    },
);

const userApi = {
    login: (data) => service.post("/admin/signin", data),
    logout: () => {
        console.log("userApi.logout");
        return service.post("/logout");
    },
    checkUser: () => service.post(`/api/user/check`),
    // checkUser: async () => {
    //     console.log("checkadmin start===");
    //     const apiBase = import.meta.env.VITE_API_BASE;
    //     // const res = await axios.post(`${apiBase}/api/user/check`);
    //     const res = await axios.post("https://ec-course-api.hexschool.io/v2/api/user/check");
    //     console.log("checkadmin end===", res);
    // },
};

const adminProductApi = {
    getAll: () => service.get(`/api/${VITE_API_PATH}/products/all`),
    getByPage: (params = 1) =>
        service.get(`/api/${VITE_API_PATH}/admin/products?`, {params}),
        // service.get(`/api/${VITE_API_PATH}/admin/products?page=${p}`),
    add: (req) => service.post(`/api/${VITE_API_PATH}/admin/product`, { data: req }),
    edit: (id, req) =>
        service.put(`/api/${VITE_API_PATH}/admin/product/${id}`, { data: req }),
    delete: (id) => service.delete(`/api/${VITE_API_PATH}/admin/product/${id}`),
};

const productApi = {
    getAll: () => service.get(`/api/${VITE_API_PATH}/products/all`),
    getByPage: (p = 1) =>
        service.get(`/api/${VITE_API_PATH}/products?page=${p}`),
    getById: (id) => service.get(`/api/${VITE_API_PATH}/products/${id}`),
};

export { userApi, adminProductApi, productApi };
export default service;
