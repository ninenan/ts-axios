/*
 * @Author: NineNan
 * @Date: 2021-02-21 20:41:33
 * @LastEditTime: 2021-03-17 22:40:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-axios/src/helpers/url.ts
 */
import { isArray, isDate, isPlainObject, encode, isURLSearchParams } from './utils'

export function buildURl(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') {
        return // 跳出当前循环 执行下一次循环
      }
      let values = []
      if (isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
      values.forEach((val: any) => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    const markIndex = url.indexOf('#') // 是否有哈希标识
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

interface URLOrigin {
  protocol: string
  host: string
}

export default function isURLSameOrigin(requestURL: string): boolean {
  const parseOrigin = resolveURL(requestURL)
  return parseOrigin.protocol === currentOrigin.protocol && parseOrigin.host === currentOrigin.host
}

const URLParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  URLParsingNode.setAttribute('href', url)
  const { protocol, host } = URLParsingNode

  return {
    protocol,
    host
  }
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
