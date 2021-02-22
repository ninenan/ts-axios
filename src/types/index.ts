/*
 * @Author: NineNan
 * @Date: 2021-02-20 22:14:30
 * @LastEditTime: 2021-02-22 22:59:48
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
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
