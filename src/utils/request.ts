/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 15:45:36
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-12-17 14:40:34
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// import router from '../router'
// type requestType = {}
// interface Response<T extends requestType> {}
// 创建axios实例
const service = axios.create({
  // 在请求地址前面加上baseURL
  baseURL: '/',
  timeout: 30000
})
// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    // 请求错误的统一处理
    console.log(error)
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code !== 200 || !res.success) {
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  (error: any) => {
    if (typeof error === 'object') {
      // ElMessage.error(JSON.stringify(error.message))
    }
    return Promise.reject(error)
  }
)

export default service
