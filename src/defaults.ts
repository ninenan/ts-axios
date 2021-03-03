/*
 * @Author: NineNan
 * @Date: 2021-03-03 22:35:32
 * @LastEditTime: 2021-03-03 22:42:29
 * @LastEditors: Please set LastEditors
 * @Description: 默认配置定义
 * @FilePath: /ts-axios/src/defaults.ts
 */
import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
