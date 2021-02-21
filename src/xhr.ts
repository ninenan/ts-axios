/*
 * @Author: NineNan
 * @Date: 2021-02-20 22:22:21
 * @LastEditTime: 2021-02-21 23:31:17
 * @LastEditors: Please set LastEditors
 * @Description: xhr
 * @FilePath: /ts-axios/src/xhr.ts
 */
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, method = 'get', url, headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.entries(headers).forEach(([name, val]: any[]) => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, val)
    }
  })

  request.send(data)
}
