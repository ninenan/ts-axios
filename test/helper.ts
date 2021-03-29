/*
 * @Author: NineNan
 * @Date: 2021-03-29 17:45:32
 * @LastEditTime: 2021-03-29 17:47:07
 * @LastEditors: Please set LastEditors
 * @Description: helper
 * @FilePath: \ts-axios\test\helper.ts
 */
export const getAjaxRequest = (): Promise<JasmineAjaxRequest> => {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(jasmine.Ajax.requests.mostRecent())
    }, 0)
  })
}
