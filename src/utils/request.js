// axios encapsulation

import axios from 'axios'
import {_getToken, _removeToken} from "@/utils/token";
import {clearUserInfo} from "@/store/slices/user";
import router from "@/router";

// 1. base url
// 2. timeout
const request = axios.create({
    baseURL:'http://geek.itheima.net/v1_0',
    timeout: 5000
})


// 添加请求拦截器
// 在请求发送之前 做拦截 插入一些自定义配置
request.interceptors.request.use((config)=> {

    //  inject token into config
    const token = _getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
// 响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error)=> {
    // monitor 401 code -- token expired
    // console.log(error)
    if (error.response.status === 401) {
        console.log(123123)
        _removeToken()
        clearUserInfo()
        router.navigate('/login')
        window.location.reload()
    }
    return Promise.reject(error)
})


// 3. request interceptor, response interceptor
export {request}
