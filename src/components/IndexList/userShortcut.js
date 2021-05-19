import { computed, ref } from 'vue'

export default function userShortcut (props, groupRef) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)
  const touch = {}
  const shortcut = computed(() => {
    return props.data.map(item => item.title)
  })
  // 点击跳转对应的dom
  // 1. 获取点击的index
  // 2. 使用scroll.scrollElement方法滚动
  const onTouchStart = (e) => {
    // 手指刚开始按下的坐标
    touch.y1 = e.touches[0].pageY
    let anchorIndex
    if (e.target.dataset.index) {
      anchorIndex = parseInt(e.target.dataset.index)
    }
    else {
      if (touch.y1 > 300) {
        anchorIndex = shortcut.value.length - 1
      }
      else {
        anchorIndex = 0
      }
    }

    touch.anchorIndex = anchorIndex

    scrollTo(anchorIndex)
  }

  const onTouchMove = (e) => {
    // 手指刚开始按下的坐标
    touch.y2 = e.touches[0].pageY
    // | 0 表示向下取整 math.flow
    const moveBlock = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    // 移动了多少个区块
    // const moveBlock = Math.floor((touch.y2 - touch.y1) / ANCHOR_HEIGHT)

    const anchorIndex = touch.anchorIndex + moveBlock

    scrollTo(anchorIndex)
  }

  const scrollTo = (index) => {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcut.value.length - 1, index))
    const targetEl = groupRef.value.children[index]
    scrollRef.value.scroll.scrollToElement(targetEl, 0)
  }

  return {
    onTouchStart,
    onTouchMove,
    scrollRef,
    shortcut
  }
}
