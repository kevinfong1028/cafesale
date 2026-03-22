// 存放登入狀態、購物車數量、通知訊息
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import msgReducer from "./slice/msgSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        msg: msgReducer
    },
});

// console.log('store', store);

export default store;
