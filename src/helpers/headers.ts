/*
 * @Author: NineNan
 * @Date: 2021-02-21 23:00:30
 * @LastEditTime: 2021-02-21 23:34:44
 * @LastEditors: Please set LastEditors
 * @Description: headers
 * @FilePath: /ts-axios/src/helpers/headers.ts
 */

import { head } from 'shelljs'
import { isPlainObject } from './utils'

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
