<template>
  <view class="container" :style="outerStyle" @click="handlePreview">
    <image
      style="width: 100%; height: 100%"
      :src="cdnImageSrc"
      :lazy-load="lazyLoad"
      :mode="mode"
      @load="handleLoad"
      @error="handleError"
      webp
    />
    <!-- <image v-if="loadError" :src="PLACE_HOLDER" class="placeholder" /> -->
  </view>
</template>
<script lang="ts" setup>
import { CDNImageForSize } from '@/utils/cdnImage'

const PLACE_HOLDER = 'https://static.qingce-tech.com/goodsCenter/2023-4/lazy.png'

interface IProps {
  src?: string
  className?: string
  width?: number | string
  height?: number | string
  lazyLoad?: boolean
  mode?:
    | 'scaleToFill' // 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
    | 'aspectFit' // 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
    | 'aspectFill' // 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
    | 'widthFix' // 宽度不变，高度自动变化，保持原图宽高比不变
    | 'heightFix' //高度不变，宽度自动变化，保持原图宽高比不变
    | 'top' // 不缩放图片，只显示图片的顶部区域
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
  preview?: boolean // 是否开启图片预览
  current?: number // 当前图片位于数组中第几张,默认为0
  urls?: string[] // 当前图片所处数组, 不传则默认为 [src]
}

const props = withDefaults(defineProps<IProps>(), {
  src: undefined,
  width: '100%',
  height: '100%',
  lazyLoad: true,
  mode: 'scaleToFill',
  preview: false,
  current: 0,
  urls: [] as any
})

const loaded = ref(false)
const loadError = ref(false)

const outerStyle = computed(() => {
  const style: any = {}
  const { width, height } = props
  if (width !== '100%') {
    style.width = width + 'rpx'
  } else {
    // #ifdef MP-WEIXIN
    style.width = '100%'
    // #endif
  }
  if (height !== '100%') {
    style.height = height + 'rpx'
  } else {
    // #ifdef MP-WEIXIN
    style.height = '100%'
    // #endif
  }
  return style
})

const cdnImageSrc = computed(() => {
  const options: any = {
    url: props.src
  }
  if (props.width !== '100%') {
    options.pxWidth = props.width
  }
  if (props.height !== '100%') {
    options.pxHeight = props.height
  }
  return CDNImageForSize(options)
})

const handleLoad = (e: any) => {
  // console.log("img load success", e, props.src);
  loaded.value = true
}
const handleError = (e: any) => {
  // console.log("img load err", e, props.src);
  loadError.value = true
}

const previewUrls = computed(() => {
  return (props.urls?.length ?? 0) > 0 ? props.urls : [props.src]
})

const handlePreview = () => {
  if (props.preview) {
    console.log('预览')
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  background-color: #f4f4f4;
  image {
    will-change: transform;
  }
}
.placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
</style>
