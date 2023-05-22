/*
 * @Author: wangmengyuan
 * @Date: 2023-05-22
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-22
 * @FilePath: /vue3-mpa/src/utils/tool.ts
 * @Description:
 */
/**
 * 字典转数组
 * @param {Object} obj - 字典
 */
export function dic2Array(obj: any) {
  const resArr = [] as any
  for (const key in obj) {
    if (obj.hasOwnProperty.call(key)) {
      const item: any = obj[key]
      resArr.push(item)
    }
  }
  return resArr
}

// 根据屏幕框高判断横竖屏
export function checkScreenOrientation() {
  return window.innerWidth > window.innerHeight ? 'Horizontal' : 'Vertical'
}

export function banTouchMove() {
  document.body.ontouchmove = function (e) {
    e.preventDefault()
  }
}

// ios or android
export function isIphone() {
  return /(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)
}

export function isAndroid() {
  return /(Android)/i.test(window.navigator.userAgent)
}

/**
 * case1: 小于1w时，显示完整，如：9834人。
case2: 大于1w小于1亿时，取“万位数+千位数”，显示如：1.3w人。
case3: 大于1亿时，取“亿位数+万位数”，显示如：1.3亿人。
 */
export function parseNum(num: number) {
  if (!num) {
    return 0
  }
  if (num < 10000 && num >= 0) {
    return num
  }
  if (num >= 10000 && num < 100000000) {
    return parseFloat((num / 10000).toFixed(1)) + '万'
  }
  if (num >= 10000000) {
    return parseFloat((num / 10000000).toFixed(4)) + '亿'
  }
}

export const getWindowHeight = () => {
  let windowHeight = 0
  if (document.compatMode == 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

// 小程序的环境  //1开发版，2体验版，0线上版
export const getMiniEnvVersion = (): number => {
  const env = 'test'
  const miniEnvDic: any = {
    prod: 0,
    pre: 2,
    dev: 1,
    test: 1,
    release: 2
  }
  return miniEnvDic[env]
}
