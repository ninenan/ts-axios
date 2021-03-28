/*
 * @Author: NineNan
 * @Date: 2021-03-28 15:38:59
 * @LastEditTime: 2021-03-28 16:24:04
 * @LastEditors: Please set LastEditors
 * @Description: headers test
 * @FilePath: /ts-axios/test/helpers/header.spec.ts
 */
import { processHeaders, parseHeaders, flattenHeaders } from '../../src/helpers/headers'
describe('helpers:headers', () => {
  describe('parseHeaders', () => {
    test('should parse headers', () => {
      const parsed = parseHeaders(
        'Content-Type: application/json\r\n' +
          'Connection: keep-alive\r\n' +
          'Transfer-Encoding: chunked\r\n' +
          'Date: Tue, 21 May 2019 09:23:44 GMT\r\n' +
          ':aa\r\n' +
          'key:'
      )

      expect(parsed['content-type']).toBe('application/json')
      expect(parsed['connection']).toBe('keep-alive')
      expect(parsed['date']).toBe('Tue, 21 May 2019 09:23:44 GMT')
      expect(parsed['key']).toBe('')
      expect(parsed['transfer-encoding']).toBe('chunked')
    })

    test('should return empty object if headers is empty string', () => {
      expect(parseHeaders('')).toEqual({})
    })
  })

  describe('processHeaders', () => {
    test('should normalize Content-type header name', () => {
      const headers: any = {
        'conTenT-type': 'foo/bar',
        'Content-length': 1024
      }

      processHeaders(headers, {})
      expect(headers['Content-Type']).toBe('foo/bar')
      expect(headers['Content-length']).toBe(1024)
      expect(headers['conTenT-Type']).toBeUndefined()
    })

    test('should set Content-type if node set and data is PlainObject', () => {
      const headers: any = {}
      processHeaders(headers, { a: 1 })

      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
    })

    test('should be not Content-type if not set and data is not plainObject', () => {
      const headers: any = {}
      processHeaders(headers, new URLSearchParams('a=b'))

      expect(headers['Content-Type']).toBeUndefined()
    })

    test('should do nothing if headers is undefined or null', () => {
      expect(processHeaders(undefined, {})).toBeUndefined()
      expect(processHeaders(null, {})).toBeNull()
    })
  })

  describe('flattenHeaders', () => {
    test('should flatten the headers and include common headers', () => {
      const headers: any = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }

      expect(flattenHeaders(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeaderValue',
        'X-GET-HEADER': 'getHeaderValue'
      })
    })

    test('should flatten the headers without common headers', () => {
      const headers: any = {
        Accept: 'application/json',
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        }
      }

      expect(flattenHeaders(headers, 'post')).toEqual({
        Accept: 'application/json'
      })
    })

    test('should do nothing if headers is undefined or null', () => {
      expect(flattenHeaders(undefined, 'get')).toBeUndefined()
      expect(flattenHeaders(null, 'post')).toBeNull()
    })
  })
})
