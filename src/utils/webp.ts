/*
 * @Author       : 任洪建
 * @Date         : 2021-04-30 16:15:58
 * @LastEditTime: 2023-05-22
 * @LastEditors: wangmengyuan
 * @FilePath: /vue3-mpa/src/utils/webp.ts
 * @Description  : webp支持性校验
 */
import { saveCacheObject, getCacheObject } from '@/utils/cacheUtil'

const CACHE_KEY = 'isSupportWebp'

class WebpInfo {
  isSupport: any
  isChecking: boolean
  constructor() {
    this.isSupport = getCacheObject(CACHE_KEY)
    this.isChecking = false
  }

  checkSupport() {
    return this.isSupport
  }

  init() {
    if (this.isSupport == null) {
      // 防止重复校验
      if (this.isChecking) {
        return false
      }
      this.isChecking = true
      const image = new Image()
      // 图片加载完成时候的操作
      image.onload = () => {
        // 图片加载成功且宽度为1，那么就代表支持webp了，因为这张base64图是webp格式。如果不支持会触发image.error方法
        if (image.width == 1) {
          this.isSupport = true
        } else {
          this.isSupport = false
        }
        saveCacheObject(CACHE_KEY, this.isSupport)
      }
      image.onerror = () => {
        this.isSupport = false
        saveCacheObject(CACHE_KEY, this.isSupport)
      }
      // 一张支持alpha透明度的webp的图片，使用base64编码
      image.src =
        'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=='
    }
  }
}

export default new WebpInfo()
