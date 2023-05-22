/*
 * @Author: wangmengyuan
 * @Date: 2023-03-01
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-22
 * @FilePath: /vue3-mpa/src/vite-env.d.ts
 * @Description:
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_GATEWAY: string
  readonly VITE_BASE_PATH: string
  readonly VITE_DROP_DEBUGGER: string
  readonly VITE_DROP_CONSOLE: string
  readonly VITE_OUT_DIR: string
  readonly VITE_SOURCEMAP: string
  readonly VITE_PORT: number
  readonly VITE_TENANT_ID: number
  readonly VITE_WAP_PATH: string
  readonly VITE_QYWX_APPID: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
