import BScroll from '@better-scroll/core'
// ObserveDOM 主要用于初始化的时候, 因为没有数据, 容器没有高度, 就会使页面无法滚动
// 可以等有数据的时候, 在初始化bscroll
// 或者使用这个插件, 监听dom变化, dom变化之后, 就刷新高度重新计算
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, ref, onUnmounted } from 'vue'

BScroll.use(ObserveDOM)
export default function useScroll (wrapper, options) {
  const bs = ref(null)
  onMounted(() => {
    bs.value = new BScroll(wrapper.value, {
      observeDOM: true,
      ...options
    })
  })

  onUnmounted(() => {
    bs.value.disable()
  })
}
