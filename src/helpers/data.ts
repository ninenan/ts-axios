/*
 * @Author: NineNan
 * @Date: 2021-02-21 22:42:33
 * @LastEditTime: 2021-02-22 22:47:18
 * @LastEditors: Please set LastEditors
 * @Description: requestBody
 * @FilePath: /ts-axios/src/helpers/data.ts
 */
import { isPlainObject, isString } from './utils'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (isString(data)) {
    try {
      data = JSON.parse(data)
    } catch (error) {}
  }
  return data
}
