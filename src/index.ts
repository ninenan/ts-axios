/*
 * @Author: NineNan
 * @Date: 2021-02-19 23:23:04
 * @LastEditTime: 2021-02-21 23:27:37
 * @LastEditors: Please set LastEditors
 * @Description: ts-axios
 * @FilePath: /ts-axios/src/index.ts
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURl(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
