/*
 * @Author: your name
 * @Date: 2021-03-31 14:08:00
 * @LastEditTime: 2021-03-31 20:46:47
 * @LastEditors: Please set LastEditors
 * @Description: interceptor test
 * @FilePath: \ts-axios\test\interceptor.spec.ts
 */
import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'

describe('interceptor', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should add a request interceptor', () => {
    const instance = axios.create()

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers.test = 'added by interceptor'
      return config
    })

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders.test).toBe('added by interceptor')
    })
  })

  test('should add a request interceptor that returns a promise', done => {
    const instance = axios.create()

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return new Promise(resolve => {
        setTimeout(() => {
          config.headers.async = 'promise'
          resolve(config)
        }, 10)
      })
    })

    instance('/foo')

    setTimeout(() => {
      getAjaxRequest().then(request => {
        expect(request.requestHeaders.async).toBe('promise')
      })
    }, 100)
  })

  test('should add multiple request interceptors', () => {
    const instance = axios.create()
  })
})
