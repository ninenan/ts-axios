/*
 * @Author: NineNan
 * @Date: 2021-03-25 22:40:15
 * @LastEditTime: 2021-03-26 14:31:26
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

    test('should deepMerge properties', () => {
      const objA = {
        foo: '000'
      }
      const objB: any = {
        foo: 123
      }
      const objC: any = {
        bar: 456
      }
      const objD: any = deepMerge(objA, objB, objC)

      expect(objD.foo).toBe(123)
      expect(objD.bar).toBe(456)
    })

    test('should deepMerge recursively', () => {
      const objA = {
        foo: {
          bar: 123
        }
      }
      const objB = {
        foo: {
          baz: 456
        },
        bar: 789
      }
      const objC = deepMerge(objA, objB)

      expect(objC).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: 789
      })
    })

    test('should remove all references from nested objects', () => {
      const objA = {
        foo: {
          bar: 123
        }
      }
      const objB = {}
      const objC = deepMerge(objA, objB)

      expect(objC).toEqual({
        foo: {
          bar: 123
        }
      })
      expect(objC.foo).not.toBe(objA.foo)
    })

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })
      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })
})
