/*
 * @Author: NineNan
 * @Date: 2021-03-26 14:49:42
 * @LastEditTime: 2021-03-28 15:13:45
 * @LastEditors: Please set LastEditors
 * @Description: data test
 * @FilePath: \ts-axios\test\helpers\data.spec.ts
 */
import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers:data', () => {
  describe('transformRequest', () => {
    test('should transform request data to string if data is a PlainObject', () => {
      const obj = { name: 'NNN' }

      expect(transformRequest(obj)).toEqual('{"name":"NNN"}')
    })

    test('if it is not a PlainObject, output it as it is', () => {
      const str: string = 'nineNan'
      const num: number = 100
      // const nothing: number = 100

      expect(transformRequest(str)).toEqual('nineNan')
      expect(transformRequest(num)).toEqual(100)
    })
  })

  describe('transformResponse', () => {
    test('should transform response data to object if data is a JSON string', () => {
      const a = '{"a":111}'
      expect(transformResponse(a)).toEqual({ a: 111 })
    })

    test('should do nothing if data is a string but not a JSON string', () => {
      const a = '{a: 2}'
      expect(transformResponse(a)).toEqual('{a: 2}')
    })

    test('should do nothing if data is not a string', () => {
      const a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
