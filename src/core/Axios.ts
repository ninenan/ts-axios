/*
 * @Author: NineNan
 * @Date: 2021-02-27 16:39:53
 * @LastEditTime: 2021-02-27 17:18:11
 * @LastEditors: Please set LastEditors
 * @Description: Axios
 * @FilePath: /ts-axios/src/core/Axios.ts
 */

import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, config: AxiosRequestConfig, data?: any): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, config: AxiosRequestConfig, data?: any): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, config: AxiosRequestConfig, data?: any): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
