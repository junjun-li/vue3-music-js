<template>
  <div
    ref="root"
    class="slider">
    <div class="slider-group">
      <div
        v-for="item in sliders"
        :key="item.id"
        class="slider-page">
        <a :href="item.link">
          <img :src="item.pic"/>
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{'active': currentPageIndex === index}"
        class="dot">
      </span>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import useSlider from './useSlider'

export default defineComponent({
  name: 'Slider',
  props: {
    sliders: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const root = ref(null)
    // 这里不能传 root.value
    // 如果传了 useSlider 就拿不到 dom 对象了, 因为这个值不是响应式的了
    const { currentPageIndex } = useSlider(root)

    return {
      root,
      currentPageIndex
    }
  }
})
</script>

<style
  lang="scss"
  scoped>

.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  position: relative;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;

      a {
        display: block;
        width: 100%;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
