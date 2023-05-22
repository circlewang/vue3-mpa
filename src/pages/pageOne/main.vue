<!--
 * @Author: wangmengyuan
 * @Date: 2023-05-22
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-23
 * @FilePath: /bin/Users/wmy/Desktop/vue3-mpa/src/pages/pageOne/main.vue
 * @Description:  
-->
<script setup lang="ts">
import { usePageOneStore } from '@/store/pageOneStore'

const counterStore = usePageOneStore()
// 以下三种方式都会被 devtools 跟踪
counterStore.count++
counterStore.$patch({ count: counterStore.count + 1 })
counterStore.increment()
</script>

<template>
  <div>页面1</div>
  <div>{{ counterStore.count }}</div>
  <div>{{ counterStore.doubleCount }}</div>
</template>
