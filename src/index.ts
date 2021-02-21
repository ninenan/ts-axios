/*
 * @Author: NineNan
 * @Date: 2021-02-19 23:23:04
 * @LastEditTime: 2021-02-21 21:52:00
 * @LastEditors: Please set LastEditors
 * @Description: ts-axios
 * @FilePath: /ts-axios/src/index.ts
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURl } from './helpers/url'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURl(url, params)
}

export default axios
