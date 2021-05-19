<template>
  <!--音乐列表-->
  <div class="music-list">
    <div
      class="back"
      @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image"></div>
    <div class="filter"></div>
    <Scroll class="list">
      <SongList :songs="songs"/>
      <!--<div class="song-list-wrapper">-->
      <!--  &lt;!&ndash;歌单列表&ndash;&gt;-->
      <!--  -->
      <!--</div>-->
    </Scroll>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Scroll from '@/components/Scroll'
import SongList from '@/components/SongList/SongList'

export default defineComponent({
  name: 'MusicList',
  components: { SongList, Scroll },
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    title: String,
    pic: String,
    loading: Boolean
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const goBack = () => {
      router.back()
    }

    return {
      goBack
    }
  }
})
</script>

<style
  lang="scss"
  scoped>
.music-list {
  position: relative;
  height: 100%;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
  }

  .list {
    position: absolute;
    bottom: 0;
    top: 0;
    width: 100%;
    z-index: 0;

    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
