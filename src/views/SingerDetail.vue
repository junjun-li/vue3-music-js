<template>
  <div class="singer-detail">
    <!--<MusicList-->
    <!--  :songs="songList"-->
    <!--  title="周杰伦"-->
    <!--  pic="http://y.gtimg.cn/music/photo_new/T001R800x800M00000067r4p0wBDDN.jpg"-->
    <!--/>-->
    <!--MusicList 我暂时不抽, 现在有点蒙-->
    <div class="music-list">
      <div
        class="back"
        @click="goBack">
        <i class="icon-back"></i>
      </div>
      <h1 class="title">{{ name }}</h1>
      <div
        ref="bgImageRef"
        class="bg-image"></div>
      <div class="filter"></div>
      <Scroll
        ref="scroll"
        :style="listStyle"
        class="list">
        <!--<div class="song-list-wrapper">-->
        <!--歌单列表-->
        <!--<SongList :songs="songList"/>-->
        <ul class="song-list">
          <li
            v-for="song in songList"
            :key="song.id"
            class="item">
            <div class="content">
              <h2 class="name">{{ song.name }}</h2>
              <p class="desc">{{ getDesc(song) }}</p>
            </div>
          </li>
        </ul>
        <!--</div>-->
      </Scroll>
    </div>
  </div>
</template>

<script>
import { getSingerDetail, processSongs } from '@/api'
import { onMounted, ref, defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MusicList from '@/components/MusicList/MusicList'
import SongList from '@/components/SongList/SongList'
import Scroll from '@/components/Scroll/Scroll'

export default defineComponent({
  name: 'SingerDetail',
  props: {
    singer: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Scroll
    // SongList
    // MusicList
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    const singerId = ref('')
    const songList = ref([])
    const bgImageRef = ref(null)
    const listStyle = ref({})
    const name = computed(() => {
      return props.singer && props.singer.name
    })
    const pic = computed(() => {
      return props.singer && props.singer.pic
    })
    const _getSingerDetail = async () => {
      const res = await getSingerDetail(singerId.value)
      songList.value = await processSongs(res.data.songs)
    }
    const goBack = () => {
      router.back()
    }
    const getDesc = (song) => {
      return `${song.singer}·${song.album}`
    }
    onMounted(() => {
      if (!route.params.id) {
        router.push(`/singer`)
        return
      }
      else {
        singerId.value = route.params.id
        _getSingerDetail()
      }
      bgImageRef.value.style.backgroundImage = `url(${pic.value})`

      listStyle.value = {
        top: `${bgImageRef.value.clientHeight}px`
      }
    })

    return {
      songList,
      bgImageRef,
      listStyle,
      pic,
      name,
      goBack,
      getDesc
    }
  }
})
</script>

<style
  lang="scss"
  scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}

// 这个是music-list组件
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
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    // style
    z-index: 0;
    padding-top: 70%;
    height: 0px;
    background-image: url(http://y.gtimg.cn/music/photo_new/T001R800x800M0000025NhlN2yWrP4.jpg);
    transform: scale(1) translateZ(0px);
  }

  .list {
    position: absolute;
    bottom: 0;
    //top: 262px;
    // 这个top需要动态的计算出来
    width: 100%;
    z-index: 0;
    height: 405px;

    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}

// 这个是song-list组件
.song-list {
  padding: 20px 30px;
  background: $color-background;

  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;

    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        @include no-wrap();
        color: $color-text
      }

      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>
