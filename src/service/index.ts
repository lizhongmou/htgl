// 导入url链接与等待时间
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config/index'
import HYRequest from './request/index'
import LoginToken from '@/global/constants'
// HYInterceptors
// 定义了这个类型
// 定义这个实例
const hyRequest = new HYRequest({
  // baseURL: "http://codercba.com:1888/airbnb/api",
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 传入一些拦截器
  interceptors: {
    // 定义的拦截，这个是只有这里有的拦截。针对这个的拦截
    // 这里的目的是拦截器成功以后携带token，传递token
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LoginToken)
      // 因此使用类型缩小
      if (config.headers && token) {
        // config.headers默认是没有值
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    requestFailureFn: (err) => {
      // console.log("爱彼迎的请求失败的拦截");
      return err
    },
    responseSuccessFn: (res) => {
      // console.log("爱彼迎的响应成功的拦截");
      return res
    },
    responseFailureFn: (err) => {
      // console.log("爱彼迎的响应失败的拦截");
      return err
    }
  }
})

export default hyRequest
