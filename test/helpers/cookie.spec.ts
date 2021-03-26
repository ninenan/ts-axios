/*
 * @Author: NineNan
 * @Date: 2021-03-26 14:38:43
 * @LastEditTime: 2021-03-26 14:47:50
 * @LastEditors: Please set LastEditors
 * @Description: cookie test
 * @FilePath: \ts-axios\test\helpers\cookie.spec.ts
 */
import cookie from '../../src/helpers/cookie'
describe('helpers:cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'foo=bar'
    expect(cookie.read('foo')).toBe('bar')
  })

  test('should return null if cookie name is no exist', () => {
    document.cookie = 'foo=bar'
    expect(cookie.read('bar')).toBeNull()
  })
})
