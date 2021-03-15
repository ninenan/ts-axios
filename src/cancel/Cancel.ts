/*
 * @Author: NineNan
 * @Date: 2021-03-08 22:33:21
 * @LastEditTime: 2021-03-15 21:33:36
 * @LastEditors: Please set LastEditors
 * @Description: Cancel
 * @FilePath: /ts-axios/src/cancel/Cancel.ts
 */
export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
