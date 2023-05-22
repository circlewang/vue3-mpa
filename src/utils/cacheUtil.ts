/*
 * @Author: wangmengyuan
 * @Date: 2023-05-22
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-22
 * @FilePath: /vue3-mpa/src/utils/cacheUtil.ts
 * @Description:
 */
export const saveCacheString = (key: string, data: any) => localStorage.setItem(key, data)
export const getCacheString = (key: string) => localStorage.getItem(key)
export const removeCache = (key: string) => localStorage.removeItem(key)
export const removeAutoExpireCache = (key: string) => removeCache(key)

/**
 * @description 保存会自动过期的缓存
 * @param {String} key key
 * @param {[Object,String]} data 数据
 * @param {Number} expire 过期时间, new Date().getTime() + 时间间隔获取到的时间戳
 */
export const saveAutoExpireCache = (key: string, data: any, expire: any) => {
  const saveStr = JSON.stringify({
    data,
    expire
  })
  saveCacheString(key, saveStr)
}

export const getAutoExpireCache = (key: string) => {
  const cacheStr = getCacheString(key)
  if (cacheStr && cacheStr.length > 0) {
    try {
      const data = JSON.parse(cacheStr)
      if (data && data.expire != null) {
        if (new Date().getTime() < data.expire) {
          return data.data
        }
      }
    } catch (error) {
      console.error('- - - - - - getAutoExpireCache 尝试JSON失败', error, cacheStr)
    }
  }
  return null
}

export const saveCacheObject = (key: string, data: any) => {
  // if (typeof data === 'object') {
  saveCacheString(key, JSON.stringify(data))
  // } else {
  //   saveCacheString(key, data);
  // }
}

export const getCacheObject = (key: string) => {
  const str = getCacheString(key)
  try {
    if (str == null || str.length === 0) {
      return null
    }
    return JSON.parse(str)
  } catch (error) {
    console.error('- - - - - - rhjlog parse cache obj error:', error, str)
  }
  return null
}
