/*
 * @Author: NineNan
 * @Date: 2021-02-21 23:00:30
 * @LastEditTime: 2021-03-16 23:18:10
 * @LastEditors: Please set LastEditors
 * @Description: headers
 * @FilePath: /ts-axios/src/helpers/headers.ts
 */
import { Method } from '../types'
import { deepMerge, isPlainObject } from './utils'

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)

  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    // if (val) {
    //   val = val.trim()
    // }
    const val = vals.join(':').trim()
    parsed[key] = val
  })

  return parsed
}

export const flattenHeaders = (headers: any, method: Method): any => {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'post', 'head', 'options', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
