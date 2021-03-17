/*
 * @Author: NineNan
 * @Date: 2021-02-27 16:42:17
 * @LastEditTime: 2021-03-17 23:00:37
 * @LastEditors: Please set LastEditors
 * @Description: dispatchRequest
 * @FilePath: /ts-axios/src/core/dispatchRequest.ts
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURl, combineURL, isAbsoluteURL } from '../helpers/url'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(
    res => {
      return transformResponseData(res)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    }
  )
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURl(url!, params, paramsSerializer) // url后面加! 表示断言url不为空
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data)
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
