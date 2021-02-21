/*
 * @Author: NineNan
 * @Date: 2021-02-21 22:42:33
 * @LastEditTime: 2021-02-21 22:43:55
 * @LastEditors: Please set LastEditors
 * @Description: requestBody
 * @FilePath: /ts-axios/src/helpers/data.ts
 */
import { isPlainObject } from './utils'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
