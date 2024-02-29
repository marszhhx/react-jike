// 组合redux 子模块



import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store/slices/user";

const store = configureStore({
    reducer: {
        user: userReducer
    }
})


export default store
// 导出store 实例