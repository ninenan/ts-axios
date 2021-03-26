/*
 * @Author: NineNan
 * @Date: 2021-03-25 22:40:15
 * @LastEditTime: 2021-03-26 13:42:10
 * @LastEditors: Please set LastEditors
 * @Description: util test
 * @FilePath: /ts-axios/test/helpers/util.spec.ts
 */
import {
  isDate,
  isArray,
  isString,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/utils'

describe('helpers/utils', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate string', () => {
      expect(isString('12312')).toBeTruthy()
      expect(isString({})).toBeFalsy()
      expect(isString(123)).toBeFalsy()
      expect(isString(new Date())).toBeFalsy()
      expect(isString([])).toBeFalsy()
    })

    test('should validate array', () => {
      expect(isArray([])).toBeTruthy()
      expect(isArray('')).toBeFalsy()
      expect(isArray(null)).toBeFalsy()
      expect(isArray(undefined)).toBeFalsy()
      expect(isArray({})).toBeFalsy()
      expect(isArray(123)).toBeFalsy()
    })

    test('should validate plainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject('')).toBeFalsy()
      expect(isPlainObject(null)).toBeFalsy()
      expect(isPlainObject(12321)).toBeFalsy()
      expect(isPlainObject({ name: 'NNN' })).toBeTruthy()
      expect(isPlainObject(undefined)).toBeFalsy()
    })

    // test('should validate FormData', () => {
    //   expect(isFormData(new FormData())).toBeTruthy()
    // })

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const objA = Object.create(null)
      const objB = {
        foo: 123
      }
      extend(objA, objB)
      expect(objA.foo).toBe(123)
    })

    test('should extend properties', () => {
      const objA: any = {
        bar: 456,
        foo: 123
      }
      const objB: any = {
        bar: 789
      }
      const objC: any = extend(objA, objB)

      expect(objC.foo).toBe(123)
      expect(objC.bar).toBe(789)
    })
  })

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const objA = Object.create(null)
      const objB: any = {
        foo: 123
      }
      const objC: any = {
        bar: 456
      }
      deepMerge(objA, objB, objC)
      expect(typeof objA.foo).toBe('undefined')
      expect(typeof objA.bar).toBe('undefined')
      expect(typeof objB.bar).toBe('undefined')
      expect(typeof objC.foo).toBe('undefined')
    })
  })
})
