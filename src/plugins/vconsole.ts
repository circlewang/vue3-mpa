/*
 * @Author: wangmengyuan
 * @Date: 2023-05-10
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-10
 * @FilePath: /vue3-mobile/src/plugins/vconsole.ts
 * @Description:
 */
import VConsole from 'vconsole'

const _env = import.meta.env.MODE

const isDevelopment = _env === 'development'
const vConsole = !isDevelopment && ['dev', 'test', 'release'].includes(_env) ? new VConsole() : ''
// const vConsole = new VConsole()
export default vConsole
