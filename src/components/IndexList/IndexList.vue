<template>
  <Scroll
    ref="scrollRef"
    :probeType="3"
    class="index-list"
    @scroll="onScroll">
    <ul ref="groupRef">
      <li
        v-for="(group,index) in data"
        :key="index"
        class="group">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li
            v-for="item in group.list"
            :key="item.id"
            class="item"
            @click="goToSingerDetail(item)">
            <img
              v-lazy="item.pic"
              :alt="item.pic"
              class="avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="shortcut">
      <ul
        @touchstart.stop.prevent="onTouchstart"
        @touchmove.stop.prevent="onTouchmove">
        <li
          v-for="(item, index) in shortcut"
          :key="item"
          :class="index === currentIndex ? 'current' : ''"
          :data-index="index"
          class="item">
          {{item}}
        </li>
      </ul>
    </div>
    <div
      v-show="fixedTitle !== ''"
      :style="fixedStyle"
      class="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </Scroll>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import Scroll from '@/components/Scroll/Scroll'
import { useRoute, useRouter } from 'vue-router'
import useShortcut from './useShortcut'
import useFixed from './useFixed'

export default defineComponent({
  name: 'IndexList',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: { Scroll },
  setup (props, { emit }) {
    const router = useRouter()
    const shortcut = computed(() => {
      return props.data.map(item => item.title)
    })
    const scrollRef = ref(null)
    const groupRef = ref(null)
    const { onTouchstart, onTouchmove } = useShortcut(scrollRef, groupRef)
    const { fixedTitle, fixedStyle, onScroll, currentIndex } = useFixed(groupRef, props, shortcut)
    const goToSingerDetail = (item) => {
      emit('goToSingerDetail', item)
    }

    return {
      shortcut,
      scrollRef,
      groupRef,
      currentIndex,
      fixedTitle,
      fixedStyle,
      onTouchstart,
      onTouchmove,
      onScroll,
      goToSingerDetail
    }
  }
})
</script>

<style
  lang="scss"
  scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .group {
    padding-bottom: 30px;

    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme
      }
    }
  }
}
</style>
