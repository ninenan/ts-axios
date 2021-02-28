/*
 * @Author: NineNan
 * @Date: 2021-02-27 16:39:53
 * @LastEditTime: 2021-02-28 21:58:55
 * @LastEditors: Please set LastEditors
 * @Description: Axios
 * @FilePath: /ts-axios/src/core/Axios.ts
 */

import { isString } from '../helpers/utils'
import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(url: any, config?: any): AxiosPromise {
    if (isString(url)) {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
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
