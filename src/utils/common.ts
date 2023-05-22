/*
 * @Author: your name
 * @Date: 2021-03-18 16:49:20
 * @Description: file content
 */

export function isWifi() {
  try {
    let wifi = true
    const win: any = window.navigator
    const ua = win.userAgent
    const con = win.connection
    // 如果是微信
    if (/MicroMessenger/.test(ua)) {
      if (ua.includes('WIFI')) {
        return true
      } else {
        wifi = false
      }
    }
    // 如果支持navigator.connection
    else if (con) {
      const network = con.type
      if (network !== 'wifi' && network !== '2' && network !== 'unknown') {
        wifi = false
      }
    }
    return wifi
  } catch (e) {
    return false
  }
}

export function getViewPortWidth() {
  return document.documentElement.clientWidth || document.body.clientWidth
}

export function getViewPortHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight
}

export function getImageSize(url: string, soureFile: any, fiexData: any) {
  const dRatio = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio
  url = url?.includes('?') ? url : `${url}?x-oss-process=image`
  const { height, width } = fiexData || {}
  const resize = `/resize,m_pad,w_${Number(width * dRatio)},h_${Number(height * dRatio)},color_ffffff`
  // const resize = `/resize,m_pad,w_${width},h_${height},color_ffffff`
  const getCropLaterUrl = (w: any, h: any) => {
    return `${url}/crop,w_${w},h_${h},g_center${resize}/format,webp`
  }

  if (soureFile.height && soureFile.width) {
    const percenter = soureFile.width / soureFile.height
    const minScale = 0.75
    const maxScale = 1.333
    let w = width
    let h = height
    if (percenter >= minScale && percenter <= maxScale) {
      w = soureFile.width
      h = soureFile.height
      return { width: w, height: h, url: getCropLaterUrl(w, h) }
    } else if (percenter < minScale) {
      // 长图
      h = Number((soureFile.width / 3) * 4)
      return { width: soureFile.width, height: h, url: getCropLaterUrl(soureFile.width, h) }
    } else if (percenter > maxScale) {
      // 宽图
      w = Number((soureFile.height / 3) * 4)
      return { width: w, height: soureFile.height, url: getCropLaterUrl(w, soureFile.height) }
    }
  }
  return { width, height }
}
