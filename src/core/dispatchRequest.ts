/*
 * @Author: NineNan
 * @Date: 2021-02-27 16:42:17
 * @LastEditTime: 2021-03-07 17:40:08
 * @LastEditors: Please set LastEditors
 * @Description: dispatchRequest
 * @FilePath: /ts-axios/src/core/dispatchRequest.ts
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
  console.log('config.headers :>> ', config.headers)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURl(url!, params) // url后面加! 表示断言url不为空
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(params: AxiosResponse): AxiosResponse {
  params.data = transformResponse(params.data)
  return params
}
