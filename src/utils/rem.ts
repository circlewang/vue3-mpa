/*
 * @Author: wangmengyuan
 * @Date: 2023-06-01
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-06-01
 * @FilePath: /vue3-mpa/src/utils/rem.ts
 * @Description:
 */
export const initRem = (screenRatioByDesign = 16 / 7) => {
  const docEle = document.documentElement
  function setHtmlFontSize() {
    const screenRatio = docEle.clientWidth / docEle.clientHeight
    // eslint-disable-next-line prettier/prettier
    const fontSize =
      ((screenRatio > screenRatioByDesign ? screenRatioByDesign / screenRatio : 1) * docEle.clientWidth) / 10
    docEle.style.fontSize = fontSize.toFixed(3) + 'px'
    // console.log(docEle.style.fontSize);
  }
  setHtmlFontSize()
  window.addEventListener('resize', setHtmlFontSize)
}
