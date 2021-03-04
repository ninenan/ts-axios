/*
 * @Author: NinNan
 * @Date: 2021-03-04 22:22:59
 * @LastEditTime: 2021-03-04 22:48:31
 * @LastEditors: Please set LastEditors
 * @Description: mergeConfig
 * @FilePath: /ts-axios/src/core/mergeConfig.ts
 */
import { AxiosRequestConfig } from '../types'

const starts = Object.create(null)
const startKeysFromVal2 = ['url', 'params', 'data']

startKeysFromVal2.forEach(key => {
  starts[key] = fromVal2Start
})

function defaultStart(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Start(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (const key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const start = starts[key] || defaultStart
    config[key] = start(config1[key], config2![key])
  }

  return config
}
