// 存放登入狀態、購物車數量、通知訊息
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// console.log('store', store);

export default store;
