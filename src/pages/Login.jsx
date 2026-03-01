import { useState } from "react";
import { userApi } from "../apis";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {login, logout} from "../store/slice/userSlice";
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "sbdrumer1028@gmail.com",
            password: "kv12345",
        },
    });

    const formSubmit = async (data) => {
        // e.preventDefault();
        console.log("formData", data);
        const { username, password } = data;

        const req = { username, password };
        console.log("req", req);

        try {
            const res = await userApi.login(req);
            console.log("res", res);
            if (res.data.success) {
                // 登入成功
                console.log("登入成功:", res.data);
                const { token, expired } = res.data;
                document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
                dispatch(login(res.data));
                navigate("/admin/products");
            } else {
                // 登入失敗
                console.error("登入失敗:", res.data?.message);
                // 可以在這裡顯示錯誤訊息給使用者
            }
        } catch (error) {
            console.error("登入過程中發生錯誤:", error);
        }
    };

    return (
        <>
            {/* <h1>Login</h1> */}
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="logo">☕</div>
                        <h1>Bean & Brew</h1>
                        <p>管理者登入</p>
                    </div>

                    <div className="error-message" id="errorMessage"></div>
                    <div className="success-message" id="successMessage"></div>

                    <form
                        id="loginForm"
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                    >
                        <div className="form-group">
                            <label htmlFor="username">電子郵件</label>
                            <input
                                type="email"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="請輸入電子郵件"
                                {...register("username", {
                                    required: "必填",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        // value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "請輸入有效的電子郵件地址",
                                    },
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">密碼</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="請輸入密碼"
                                {...register("password", {
                                    required: "必填",
                                })}
                            />
                        </div>

                        <div className="remember-me">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                            />
                            <label htmlFor="rememberMe">記住我</label>
                        </div>

                        <button type="submit" className="login-btn">
                            登入
                        </button>

                        <div className="forgot-password">
                            <a>忘記密碼？</a>
                        </div>
                    </form>

                    <div className="divider">
                        <span>或</span>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#F5F3F0",
                            padding: "1rem",
                            borderRadius: "8px",
                            marginBottom: "1.5rem",
                            fontSize: "0.8125rem",
                            color: "#666",
                            lineHeight: "1.6",
                        }}
                    >
                        <strong style={{ color: "#4B7C50" }}>測試帳號：</strong>
                        <br />
                        Email: admin@beanbrew.com
                        <br />
                        Password: admin123
                    </div>

                    <div className="features">
                        <div className="feature-item">
                            <div className="icon">📊</div>
                            <div className="title">儀表板</div>
                            <div className="description">實時銷售數據</div>
                        </div>
                        <div className="feature-item">
                            <div className="icon">📦</div>
                            <div className="title">商品管理</div>
                            <div className="description">庫存控制</div>
                        </div>
                        <div className="feature-item">
                            <div className="icon">📋</div>
                            <div className="title">訂單管理</div>
                            <div className="description">追蹤訂單</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
