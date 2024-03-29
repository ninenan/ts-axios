/*
 * @Author: NineNan
 * @Date: 2021-02-24 22:47:09
 * @LastEditTime: 2021-03-17 23:02:09
 * @LastEditors: Please set LastEditors
 * @Description: axios配置
 * @FilePath: /ts-axios/src/axios.ts
 */
import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(initConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(initConfig)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}
const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function all(promise) {
  return Promise.all(promise)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios
export default axios
