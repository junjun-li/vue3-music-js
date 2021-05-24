// 一个锚点的高度
import { ref } from 'vue'

const ANCHOR_HEIGHT = 18
// 需求:
// 1. 点击, 滚动到对应的dom
// 2. 在导航栏滚动, 滚动到对应的dom
const useShortcut = (scrollRef, groupRef) => {
  const currentIndex = ref(0)
  const touch = {
    y1: 0,
    y2: 0,
    currentIndex: 0
  }
  const onTouchstart = (e) => {
    const currentIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.currentIndex = currentIndex
    scrollTo(currentIndex)
    console.log(touch)
  }

  const onTouchmove = (e) => {
    touch.y2 = e.touches[0].pageY
    const diff = Math.ceil((touch.y2 - touch.y1) / ANCHOR_HEIGHT)
    const currentIndex = touch.currentIndex + diff
    scrollTo(currentIndex)
  }

  const scrollTo = (index) => {
    if (isNaN(index)) return
    // 限定index的值 0 <= index <= groupRef.value.children.length

    index = Math.max(0, Math.min(groupRef.value.children.length - 1, index))
    const targetEl = groupRef.value.children[index]
    scrollRef.value.scroll.scrollToElement(targetEl, 0)
    currentIndex.value = index
  }
  return {
    currentIndex,
    onTouchstart,
    onTouchmove
  }
}

export default useShortcut
