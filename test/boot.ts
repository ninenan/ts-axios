/*
 * @Author: NineNan
 * @Date: 2021-03-25 22:11:51
 * @LastEditTime: 2021-03-29 22:00:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-axios/test/boot.ts
 * 每次跑测试用例，都会执行该文件
 * 在该文件初始化jasmine-ajax
 */
const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')
