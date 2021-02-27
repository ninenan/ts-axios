/*
 * @Author: NineNan
 * @Date: 2021-02-24 22:47:09
 * @LastEditTime: 2021-02-27 17:50:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-axios/src/axios.ts
 */
import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}
const axios = createInstance()
export default axios
