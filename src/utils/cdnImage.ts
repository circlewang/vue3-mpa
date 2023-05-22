// import MapImg from '@assets/images/mapImg.png'
// import { rpx2pix } from './screenSize'
import WebpInfo from '@/utils/webp'
import { isIphone } from '@/utils/tool'

const DESIGN_SCREEN_WIDTH = 750
const DEVICE_SCREEN_WIDTH = window.screen.availWidth ?? 750
const PIXEL_RATIO = window.devicePixelRatio ?? 2

/**
 * 设计分辨率换算为物理分辨率
 * 设计屏幕宽度为 ${DESIGN_SCREEN_WIDTH} 单位 px
 * 真实屏幕宽度为 ${DEVICE_SCREEN_WIDTH} 单位 px
 * 真实屏幕宽度与真实屏幕横向物理像素比值为 ${PIXEL_RATIO}
 * 对于设计分辨率为x的图片，真实设备上所占据的物理分辨率为
 *  x/DESIGN_SCREEN_WIDTH*DEVICE_SCREEN_WIDTH*PIXEL_RATIO
 */
const designPX2Pix = (x: number) => {
  if (x) {
    return Math.ceil((x / DESIGN_SCREEN_WIDTH) * DEVICE_SCREEN_WIDTH * PIXEL_RATIO)
  }
  return 0
}

const PLACE_HOLDER = 'https://img.danchuangglobal.com/resource_h5/static/placeholder.png'

/**
 * 获取oss图片压缩url，针对宽高/质量/格式进行处理
 *
 * @param {*} url 图片url
 * @param {number} pxWidth 图片宽度
 * @param {number} pxHeight 图片高度
 * @param {boolean} [cut=false] 是否裁剪，true时需要指定宽高
 * @param {number} [quality=80] 质量 默认80
 * @param {string} [format='webp'] webp|jpg|png 指定图片格式，大多数情况使用webp即可
 * @param {number} [interlace=1] 渐进显示，当格式为jpg时有效
 *
 * @return 返回处理后的url
 */
export const CDNImageForSize = (
  url: string,
  pxWidth?: number,
  pxHeight?: number,
  cut = false,
  quality = 100,
  format = 'webp',
  interlace = 1
) => {
  if (!url) {
    return PLACE_HOLDER
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return url
  }

  if (!url.includes('img.danchuangglobal.com')) {
    return url
  }
  // if (url.match(/.gif/)) {
  //   return url
  // }
  const index = url.indexOf('x-oss-process')
  let resultUrl = url
  if (index >= 0) {
    resultUrl = url.substring(0, index - 1)
  }

  const width = designPX2Pix(pxWidth || 750)
  const height = designPX2Pix(pxHeight || 750)

  const partsArr = [] as any

  const resizeParts = [] as any

  if (width > 0 && width < 4096) {
    resizeParts.push(`w_${width}`)
  }
  if (height > 0 && height < 4096) {
    resizeParts.push(`h_${height}`)
  }

  if (resizeParts.length > 0) {
    // return url

    resizeParts.unshift('resize')
    if (cut) {
      resizeParts.push('m_fill')
    } else {
      resizeParts.push('m_mfit')
    }
    resizeParts.push('limit_1') // 大小超出不处理

    partsArr.push(resizeParts)
  }

  const queryIdx = resultUrl.indexOf('?')
  let queryString = ''
  if (queryIdx > 0) {
    queryString = `&${resultUrl.substring(queryIdx + 1)}`
    resultUrl = resultUrl.substring(0, queryIdx)
  }

  if (quality) {
    partsArr.push(['quality', `q_${quality}`])
  }
  if (format === 'jpg' || (!format && resultUrl.endsWith('.jpg'))) {
    partsArr.push(['interlace', interlace]) // 渐进显示 仅jpg生效
  }

  if (format && !resultUrl.endsWith('.gif')) {
    if (format === 'webp') {
      if (resultUrl.endsWith('.png') && isIphone()) {
        // DO NOTHING
      } else if (WebpInfo.checkSupport()) {
        partsArr.push(['format', format])
      }
    } else {
      partsArr.push(['format', format])
    }
    // if (format === 'webp') {
    //   if (WebpInfo.checkSupport()) {
    //     partsArr.push(['format', format])
    //   }
    // } else {
    //   partsArr.push(['format', format])
    // }
  }
  if (partsArr?.length > 0) {
    const result = `${resultUrl}?x-oss-process=image${partsArr
      .map((parts: any) => parts.reduce((total: any, part: any) => `${total},${part}`))
      .reduce((total: any, part: any) => `${total}/${part}`, '')}${queryString}`
    return result
  }
  return url
}
