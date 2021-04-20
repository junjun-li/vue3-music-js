import { ref, watch, nextTick, computed } from 'vue'

export default function useFixed (props) {
  const TITLE_HEIGHT = 30
  const groupRef = ref(null)
  const listHeight = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  // title距离顶部的距离
  const distance = ref(0)

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT)
      ? distanceVal - TITLE_HEIGHT
      : 0
    return {
      transform: `translate3d(0,${diff}px,0)`
    }
  })

  watch(() => props.data, async () => {
    await nextTick()
    calculate()
  })

  watch(scrollY, (newY) => {
    const listHeightVal = listHeight.value
    for (let i = 0; i < listHeightVal.length - 1; i++) {
      const heightTop = listHeightVal[i]
      // 如果直接循环listHeightVal.length的话(不减1)
      // heightBottom可能会是一个undefined
      const heightBottom = listHeightVal[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  // 计算每一个区间的高度
  function calculate () {
    listHeight.value = []
    const list = groupRef.value.children
    const listHeightVal = listHeight.value
    // 默认高度是0, 100, 20
    let height = 0

    // 初始化
    listHeightVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightVal.push(height)
    }
  }

  // scroll滚动的回调
  // pos.x: 滚动的横轴
  // pos.x: 纵轴(往下滚动是负数)
  function onScroll (pos) {
    scrollY.value = -pos.y
  }
  return {
    groupRef,
    onScroll,
    currentIndex,
    fixedTitle,
    fixedStyle
  }
}
