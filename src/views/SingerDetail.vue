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
      <h1 class="title">{{name}}</h1>
      <div
        ref="bgImageRef"
        :style="bgImageStyle"
        class="bg-image">
        <!--蒙版层-->
        <div
          :style="filterStyle"
          class="filter" />
      </div>
      <!--        v-no-data="isNoData"-->
      <Scroll
        ref="scroll"
        :probeType="3"
        :style="listStyle"
        class="list"
        v-loading:[loadingText]="loading"
        v-noData:[noDataText]="isNoData"
        @scroll="onScroll">
        <div class="song-list-wrapper">
          <!--歌单列表-->
          <!--<SongList :songs="songList"/>-->
          <ul class="song-list">
            <li
              v-for="song in songList"
              :key="song.id"
              class="item">
              <div class="content">
                <h2 class="name">{{song.name}}</h2>
                <p class="desc">{{getDesc(song)}}</p>
              </div>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import { getSingerDetail, processSongs } from '@/api'
import { onMounted, ref, defineComponent, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MusicList from '@/components/MusicList/MusicList'
import SongList from '@/components/SongList/SongList'
import Scroll from '@/components/Scroll/Scroll'
import store from 'store'

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
    // todo: 这里逻辑太乱了
    // 需要剥离
    const TITLE_HEIGHT = 40
    const loadingText = ref('详情页加载中...')
    const noDataText = ref('详情页无数据...')
    // 照片到顶部最大的偏移高度
    const maxTranslateY = ref(0)
    const route = useRoute()
    const router = useRouter()
    const singerId = ref('')
    const songList = ref([])
    const bgImageRef = ref(null)
    const listStyle = ref({})
    const scrollY = ref(0)
    const singerInfo = ref({})
    const name = computed(() => {
      return singerInfo.value && singerInfo.value.name
    })
    const pic = computed(() => {
      return singerInfo.value && singerInfo.value.pic
    })

    // 背景图片的style
    const bgImageStyle = computed(() => {
      const _scrollY = scrollY.value
      const _maxTranslateY = maxTranslateY.value
      let zIndex = 0
      let paddingTop = '70%'
      let height = '0px'
      let translateZ = 0
      if (_scrollY > _maxTranslateY) {
        zIndex = 10
        paddingTop = 0
        height = '40px'
        translateZ = 2
      }
      let scale = 1
      if (_scrollY < 0) {
        // 下拉了多少 / 图片的高度
        scale = 1 + Math.abs(_scrollY / bgImageRef.value.clientHeight)
      }
      return {
        zIndex,
        paddingTop,
        height,
        transform: `scale(${scale})translateZ(${translateZ}px)`
      }
    })

    // 蒙版层的style
    const filterStyle = computed(() => {
      const imgHeight = bgImageRef.value && bgImageRef.value.clientHeight
      let blur = 0
      const _scrollY = scrollY.value
      const _maxTranslateY = maxTranslateY.value
      if (_scrollY > 0) {
        blur = Math.min(_maxTranslateY / imgHeight, _scrollY / imgHeight) * 10
      }
      return {
        backdropFilter: `blur(${blur}px)`
      }
    })
    const loading = ref(true)
    const _getSingerDetail = async () => {
      const res = await getSingerDetail(singerId.value)
      songList.value = await processSongs(res.data.songs)
      songList.value = []
      loading.value = false
      console.log(songList.value)
    }
    const isNoData = computed(() => {
      return !songList.value || !songList.value.length
    })
    const goBack = () => {
      router.back()
    }
    const getDesc = (song) => {
      return `${song.singer}·${song.album}`
    }
    const onScroll = (pos) => {
      scrollY.value = -pos.y
    }

    onMounted(() => {
      const _singer = props.singer.value
      if (_singer) {
        singerInfo.value = _singer
      }
      else {
        // 去本地缓存找, 并且路由id === 缓存的id
        const singerDetailInfo = store.get(`singerDetailInfo`)
        if (singerDetailInfo.mid === route.params.id) {
          singerInfo.value = store.get(`singerDetailInfo`)
        }
        else {
          router.push(`/singer`)
          return
        }
      }
      singerId.value = route.params.id
      _getSingerDetail()

      const bgImage = bgImageRef.value
      bgImage.style.backgroundImage = pic.value ? `url(${pic.value})` : 'none'
      const bgHeight = bgImage.clientHeight
      maxTranslateY.value = bgHeight - TITLE_HEIGHT
      listStyle.value = {
        top: `${bgHeight}px`
      }
    })

    return {
      songList,
      bgImageRef,
      listStyle,
      pic,
      name,
      bgImageStyle,
      filterStyle,
      scrollY,
      loading,
      isNoData,
      loadingText,
      noDataText,
      goBack,
      getDesc,
      onScroll
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

  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.4);
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
