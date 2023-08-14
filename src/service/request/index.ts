import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './type'

// 拦截器: 蒙版Loading/token/修改配置
/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *  2.响应结果的类型处理(泛型)
 * 二次封装的目的是为了在这个库在后期部使用的时候，需要在多个页面同时更换的时候更加方便
 */

class HYRequest {
  instance: AxiosInstance // 成员声明，声明类型
  // request实例 => axios的实例   传入的是config
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config) // 使用axios创建一个实例
    // 每个instance实例都添加拦截器,interceptors拦截器，request请求、response响应。
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        // console.log("全局请求成功的拦截hh", config);
        return config
      },
      (err) => {
        // console.log("全局请求失败的拦截");
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("全局响应成功的拦截");
        return res.data
      },
      (err) => {
        // console.log("全局响应失败的拦截");
        return err
      }
    )

    // 添加指定的拦截
    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    // 手动去调拦截
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise,这里如果没有定义类型的话，返回的就是一个unknown类型
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 封装request然后get或者post调用request
  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}
export default HYRequest
