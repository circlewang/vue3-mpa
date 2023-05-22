/*
 * @Author: wangmengyuan
 * @Date: 2023-05-22
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-22
 * @FilePath: /vue3-mpa/src/store/pageOne.ts
 * @Description:
 */

export const usePageOneStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
