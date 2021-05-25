// 1. 计算每一个group的高度
import { ref, watch, nextTick, computed } from 'vue'

const useFixed = (groupRef, props, shortcut) => {
  // 每一行的高度
  const TITLE_HEIGHT = 30
  const listHeight = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  // 距离底部的距离
  const distance = ref(0)
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    return shortcut.value[currentIndex.value]
  })
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0px, ${diff}px, 0px)`
    }
  })
  const onScroll = (pos) => {
    scrollY.value = -pos.y
  }

  // 计算每一个group的高度[0, 700, 130+700]
  const calculate = () => {
    const group = groupRef.value.children
    let height = 0
    const list = [0]
    for (let i = 0; i < group.length; i++) {
      height += group[i].clientHeight
      list.push(height)
    }
    listHeight.value = list
  }

  // 数据变了, 从新获取每一列的高度
  watch(() => props.data, async () => {
    await nextTick()
    calculate()
  })

  watch(scrollY, (newY) => {
    // 判断newY落在哪一个区间里面
    for (let i = 0; i < listHeight.value.length; i++) {
      const heightTop = listHeight.value[i]
      const heightBottom = listHeight.value[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  return {
    fixedTitle,
    fixedStyle,
    currentIndex,
    onScroll
  }
}

export default useFixed
