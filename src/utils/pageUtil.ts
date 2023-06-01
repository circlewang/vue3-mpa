/*
 * @Author: wangmengyuan
 * @Date: 2023-06-01
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-06-01
 * @FilePath: /vue3-mpa/src/utils/pageUtil.ts
 * @Description:
 */
const ua = navigator.userAgent.toLowerCase()

const isWx: boolean = String(ua.match(/MicroMessenger/i)) === 'micromessenger'
// const isWx: boolean = String(ua.match(/MicroMessenger/i)) === 'micromessenger'

//页面导航条
export const setNavigationBarTitle = (title: string) => {
  document.title = title
  const iframe = document.createElement('iframe')
  document.body.appendChild(iframe)
  iframe.onload = function () {
    setTimeout(function () {
      document.body.removeChild(iframe)
    }, 0)
  }
  console.log(document.title, '-----')
}

//获取页面路由参数
export function getUrlParams() {
  const params: any = new URLSearchParams(window.location.search)
  const result = {} as any
  for (const [key, value] of params.entries()) {
    result[key] = value
  }
  return result
}

//将内联样式自动转rem适配
export const px2rem = (px: any) => {
  if (/%/gi.test(px)) {
    // 有百分号%，特殊处理，表述pc是一个有百分号的数，比如：90%
    return px
  } else {
    return parseFloat(px) / 75 + 'rem'
  }
}
