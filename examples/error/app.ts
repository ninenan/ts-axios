/*
 * @Author: NineNan
 * @Date: 2021-02-24 22:10:19
 * @LastEditTime: 2021-02-24 23:00:12
 * @LastEditors: Please set LastEditors
 * @Description: error router
 * @FilePath: /ts-axios/examples/error/app.ts
 */
import { CLIENT_RENEG_LIMIT } from 'tls'
import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.code)
    console.log(e.config)
    console.log(e.request)
    console.log(e.response)
    console.log(e.message)
  })
