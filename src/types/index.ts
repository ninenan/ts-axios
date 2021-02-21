/*
 * @Author: NineNan
 * @Date: 2021-02-20 22:14:30
 * @LastEditTime: 2021-02-21 23:08:15
 * @LastEditors: Please set LastEditors
 * @Description: types
 * @FilePath: /ts-axios/src/types/index.ts
 */

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'OPTIONS'
  | 'options'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
}
