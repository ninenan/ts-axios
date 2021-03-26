/*
 * @Author: NineNan
 * @Date: 2021-03-25 22:11:51
 * @LastEditTime: 2021-03-26 10:59:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-axios/test/boot.ts
 */
const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')
