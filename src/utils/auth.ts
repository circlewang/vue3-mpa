/*
 * @Date: 2021-11-03 17:47:16
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-22
 * @FilePath: /vue3-mpa/src/utils/auth.ts
 */
import { TOKEN_KEY, VISITOR_TOKEN } from './const'

const visitorToken = VISITOR_TOKEN
/**
 * 获取Token
 */
export function getToken(_isVisitor = true) {
  const _token = window.localStorage.getItem(TOKEN_KEY)
  if (!_token && _isVisitor) {
    return visitorToken
  } else {
    return _token
  }
}

export function isLogin() {
  const _token = window.localStorage.getItem(TOKEN_KEY)
  if (!_token || _token == visitorToken) {
    return false
  } else {
    return true
  }
}

/**
 * 设置Token
 * @param {*} token
 */
export function setToken(value: any) {
  window.localStorage.setItem(TOKEN_KEY, value)
}

/**
 * 设置Storage
 */
export function setStorage(key: string, value: any) {
  if (!key) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}

/**
 * 获取Storage
 */
export function getStorage(key: string) {
  if (!key) return
  try {
    const v: any = window.localStorage.getItem(key)
    return JSON.parse(v)
  } catch (e) {
    console.log(e)
  }
}

export function getUserId() {
  return getStorage('userId')
}

export function setUserId(val: any) {
  setStorage('userId', val)
}

/**
 * 删除Token
 */
export function removeToken() {
  return window.localStorage.removeItem(TOKEN_KEY)
}

export function setStore(key: string, val: any) {
  setStorage(key, val)
}

export function getStore(key: string) {
  return getStorage(key)
}

export function getVisitorToken() {
  return getToken(true)
}
