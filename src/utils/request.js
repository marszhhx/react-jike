// axios encapsulation

import axios from 'axios'

// 1. base url
// 2. timeout
const http = axios.create({
    baseURL:'http://geek.itheima.net/v1_0',
    timeout: 5000
})

// 添加请求拦截器
// 在请求发送之前 做拦截 插入一些自定义配置
http.interceptors.request.use((config)=> {
    return config
}, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
// 响应返回到客户端之前 做拦截 重点处理返回的数据
http.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})


// 3. request interceptor, response interceptor
export {http}