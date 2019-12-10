import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '../router/index'

// 创建axios实例
let service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000, // 请求超时时间
  // `headers` 是即将被发送的自定义请求头,这里的接口全部定义为json请求
  headers: { 'Content-Type': 'application/json'},
})



// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 0) {
      // 500 无登录认证，需要客户端重新登录
      if (res.code === 500) {
        router.push({ path: '/login', query: { type: "response" } })
      } else {
        //操作不成功
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
