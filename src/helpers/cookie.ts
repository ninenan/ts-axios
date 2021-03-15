/*
 * @Author: NineNan
 * @Date: 2021-03-15 23:00:30
 * @LastEditTime: 2021-03-15 23:03:04
 * @LastEditors: Please set LastEditors
 * @Description: cookie
 * @FilePath: /ts-axios/src/helpers/cookie.ts
 */
const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
