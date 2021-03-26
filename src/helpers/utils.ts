/*
 * @Author: NineNan
 * @Date: 2021-02-21 20:51:08
 * @LastEditTime: 2021-03-26 11:10:20
 * @LastEditors: Please set LastEditors
 * @Description: utils
 * @FilePath: /ts-axios/src/helpers/utils.ts
 */
const toString = Object.prototype.toString

export function isDate(params: any): params is Date {
  return toString.call(params).slice(8, -1) === 'Date'
}

export function isArray(params: any): params is Array<any> {
  return toString.call(params).slice(8, -1) === 'Array'
}

// export function isObject(params: any): params is Object {
//   return params !== null && typeof params === 'object'
// }

export function isPlainObject(params: any): params is Object {
  return toString.call(params).slice(8, -1) === 'Object'
}

export function isString(params: any): boolean {
  return toString.call(params).slice(8, -1) === 'String'
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

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export const deepMerge = (...objs: any[]): any => {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}
