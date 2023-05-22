/*
 * @Author: wangmengyuan
 * @Date: 2023-05-22
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-22
 * @FilePath: /vue3-mpa/src/pages/pageOne/index.ts
 * @Description:
 */
import { createApp } from 'vue'
import App from './main.vue'
import '@/plugins/vconsole'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).mount('#app')
