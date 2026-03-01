import axios from "axios";
console.log(import.meta.env);

// const API_BASE = import.meta.env.VITE_API_BASE;
// const API_PATH = import.meta.env.VITE_API_PATH;
// console.log("api base path", `${API_BASE}/${API_PATH}`);
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;
console.log("api base path", VITE_API_BASE);

const service = axios.create({
    baseURL: VITE_API_BASE,
    responseType: "json",
});
// console.log("service.defaults.baseURL", service.defaults.baseURL);

const userApi = {
    login: (data) => service.post("/admin/signin", data),
    logout: () => service.post("/logout"),
    checkuser: () => service.get("/api/user/check"),
};

export { userApi };
export default service;
