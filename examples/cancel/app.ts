/*
 * @Author: your name
 * @Date: 2021-03-08 22:44:36
 * @LastEditTime: 2021-03-15 21:30:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-axios/examples/cancel/app.ts
 */
import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('/cancel/get', {
    cancelToken: source.token
  })
  .catch(function(e) {
    if (axios.isCancel(e)) {
      console.log('Request canceled', e.message)
    }
  })

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

axios
  .get('/cancel/get', {
    cancelToken: new CancelToken(c => {
      cancel = c
    })
  })
  .catch(function(e) {
    if (axios.isCancel(e)) {
      console.log('Request canceled')
    }
  })

setTimeout(() => {
  cancel()
}, 200)
