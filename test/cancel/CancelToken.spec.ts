/*
 * @Author: NineNan
 * @Date: 2021-04-01 22:31:16
 * @LastEditTime: 2021-04-01 22:53:52
 * @LastEditors: Please set LastEditors
 * @Description: CancelToken test
 * @FilePath: /ts-axios/test/cancel/CancelToken.spec.ts
 */

import { Canceler } from '../../src'
import Cancel from '../../src/cancel/Cancel'
import CancelToken from '../../src/cancel/CancelToken'

describe('CancelToken', () => {
  describe('reason', () => {
    test('should returns a Cancel if cancellation has been requested', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })

      cancel!('Operation has been canceled')

      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled')
    })

    test('should has no side effect if call cancellation for multi times', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })

      cancel!('Operation has been canceled')
      cancel!('Operation has been canceled')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled')
    })

    test('should returns undefined if cancellation has not been requested', () => {
      const token = new CancelToken(() => {})

      expect(token.reason).toBeUndefined()
    })
  })

  describe('promise', () => {
    test('should returns a Promise that resolves when cancellation is requested', done => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel))
        expect(value.message).toBe('Operation has been canceled')
        done()
      })
      cancel!('Operation has been canceled')
    })
  })

  describe('throwIfRequested', () => {
    test('should throw if cancellation has been requested', () => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled')
      try {
        token.throwIfRequested()
        fail('Expected throwIfRequested to throw.')
      } catch (error) {
        if (!(error instanceof Cancel)) {
          fail('Expected throwIfRequested to throw a Cancel, but test threw ' + error + '.')
        }
        expect(error.message).toBe('Operation has been canceled')
      }
    })

    test('should does not throw if cancellation has not been requested', () => {
      const token = new CancelToken(() => {})
      token.throwIfRequested()
    })
  })

  describe('source', () => {
    test('should returns an object containing token and cancel function', () => {
      const source = CancelToken.source()

      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('Operation has been canceled')
      expect(source.token.reason).toEqual(expect.any(Cancel))
      expect(source.token.reason!.message).toBe('Operation has been canceled')
    })
  })
})
