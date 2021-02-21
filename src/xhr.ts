/*
 * @Author: NineNan
 * @Date: 2021-02-20 22:22:21
 * @LastEditTime: 2021-02-21 21:49:33
 * @LastEditors: Please set LastEditors
 * @Description: xhr
 * @FilePath: /ts-axios/src/xhr.ts
 */
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, method = 'get', url } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
