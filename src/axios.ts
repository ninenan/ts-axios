/*
 * @Author: NineNan
 * @Date: 2021-02-24 22:47:09
 * @LastEditTime: 2021-03-07 15:31:14
 * @LastEditors: Please set LastEditors
 * @Description: axios配置
 * @FilePath: /ts-axios/src/axios.ts
 */
import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'

function createInstance(initConfig: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(initConfig)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}
const axios = createInstance(defaults)
export default axios
