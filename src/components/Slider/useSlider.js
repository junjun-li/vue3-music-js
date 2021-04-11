import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { ref, onMounted, onUnmounted } from 'vue'

BScroll.use(Slide)

export default function useSlider (wrapper) {
  const slider = ref(null)
  const currentPageIndex = ref(0)

  // init bscroll
  onMounted(() => {
    const sliderVal = slider.value = new BScroll(wrapper.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: {
        autoplay: false
      }
    })

    // 幻灯片改变后, 会抛出index的值
    sliderVal.on('slideWillChange', (page) => {
      currentPageIndex.value = page.pageX
    })
  })

  // disable
  onUnmounted(() => {
    slider.value.disable()
  })

  return {
    slider,
    currentPageIndex
  }
}
