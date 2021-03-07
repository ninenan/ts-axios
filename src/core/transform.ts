/*
 * @Author: NineNan
 * @Date: 2021-03-07 19:33:59
 * @LastEditTime: 2021-03-07 19:42:42
 * @LastEditors: Please set LastEditors
 * @Description: transform
 * @FilePath: /ts-axios/src/core/transform.ts
 */
import { isArray } from '../helpers/utils'
import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
