import { type } from 'os'

/*
 * @Author: NineNan
 * @Date: 2021-02-21 20:51:08
 * @LastEditTime: 2021-02-21 22:40:07
 * @LastEditors: Please set LastEditors
 * @Description: utils
 * @FilePath: /ts-axios/src/helpers/utils.ts
 */
const toString = Object.prototype.toString

export function isDate(params: any): params is Date {
  return toString.call(params).slice(8, -1) === 'Date'
}

export function isArray(params: any): boolean {
  return toString.call(params).slice(8, -1) === 'Array'
}

// export function isObject(params: any): params is Object {
//   return params !== null && typeof params === 'object'
// }

export function isPlainObject(params: any): params is Object {
  return toString.call(params).slice(8, -1) === 'Object'
}

export function encode(params: string): string {
  return encodeURIComponent(params)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
