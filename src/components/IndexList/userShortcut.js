import { ref } from 'vue'

export default function userShortcut (props, groupRef) {
  const scrollRef = ref(null)
  const onTouchstart = (e) => {
    const anchorIndex = +e.target.dataset.index
    const targetEl = groupRef.value.children[anchorIndex]
    scrollRef.value.scroll.scrollToElement(targetEl, 0)
  }

  return {
    onTouchstart,
    scrollRef
  }
}
