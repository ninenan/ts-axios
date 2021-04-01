/*
 * @Author: NineNan
 * @Date: 2021-04-01 22:04:15
 * @LastEditTime: 2021-04-01 22:08:14
 * @LastEditors: Please set LastEditors
 * @Description: Cancel test
 * @FilePath: /ts-axios/test/cancel/Cancel.spec.ts
 */
import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('cancel:Cancel', () => {
  test('should returns correct result when message is specified', () => {
    const cancel = new Cancel('Operation has been canceled.')
    expect(cancel.message).toBe('Operation has been canceled.')
  })

  test('should returns true if value is a Cancel', () => {
    expect(isCancel(new Cancel())).toBeTruthy()
  })

  test('should returns false if value is not a cancel', () => {
    expect(isCancel({ name: 'NineNan' })).toBeFalsy()
  })
})
