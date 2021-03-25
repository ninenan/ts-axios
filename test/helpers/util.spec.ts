/*
 * @Author: NineNan
 * @Date: 2021-03-25 22:40:15
 * @LastEditTime: 2021-03-25 22:56:51
 * @LastEditors: Please set LastEditors
 * @Description: util test
 * @FilePath: /ts-axios/test/helpers/util.spec.ts
 */
import { isDate, isArray, isString, isPlainObject, isFormData } from '../../src/helpers/utils'

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
  })
})
