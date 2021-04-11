<template>
  <div class="recommend" v-loading:[loadingText]="loading">
    <Scroll class="recommend-content">
      <!--better-scroll只对dom内部的第一个元素有效-->
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider
              v-if="sliders.length"
              :sliders="sliders"/>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li
              v-for="item in albums"
              :key="item.id"
              class="item">
              <div class="icon">
                <img
                  v-lazy="item.pic"
                  height="60"
                  width="60">
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getRecommend } from '@/api'
import { ref, watch, onMounted, computed } from 'vue'
import Slider from '@/components/Slider'
import Scroll from '@/components/Scroll'

export default {
  name: 'Recommend',
  components: { Slider, Scroll },
  setup () {
    const sliders = ref([])
    const albums = ref([])
    const loadingText = ref('加载中...')
    const loading = computed(() => {
      return !sliders.value.length && !albums.value.length
    })
    const _getRecommend = async () => {
      const res = await getRecommend()
      if (res.code === 0) {
        sliders.value = res.result.sliders
        albums.value = res.result.albums
      }
    }
    onMounted(() => {
      _getRecommend()
    })

    return {
      sliders,
      albums,
      loading,
      loadingText
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }

        .name {
          margin-bottom: 10px;
          color: $color-text;
        }

        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
