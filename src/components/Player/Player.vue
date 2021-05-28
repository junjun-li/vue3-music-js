<template>
  <div class="player">
    <div
      v-show="fullScreen"
      class="normal-player">
      <div class="top">
        <div
          class="back"
          @click="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{currentPlaySong.name}}</h1>
        <h2 class="subtitle">{{currentPlaySong.singer}}</h2>
      </div>
      <div class="middle"></div>
      <div class="bottom">
        <!--进度条-->
        <div class="progress-wrapper"></div>
        <!--操作-->
        <Operators
          :audioRef="audioRef"
          :songReady="songReady"
        />
      </div>
    </div>
    <audio
      ref="audioRef"
      @canplay="canplay"
      @error="error"
      @loadstart="loadstart"
      @pause="pause" />
  </div>
</template>

<script>
import Operators from '@/components/Player/Operators'
import { SET_FULL_SCREEN, SET_PLAYING } from '@/store/mutations_types'
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Player',
  components: { Operators },
  setup () {
    const store = useStore()
    // 歌曲是否准备好了
    const songReady = ref(false)
    const audioRef = ref(null)
    const currentPlaySong = computed(() => store.getters.currentPlaySong)
    const fullScreen = computed(() => store.state.fullScreen)
    const back = () => {
      store.commit(SET_FULL_SCREEN, false)
    }

    const pause = () => {
      // 如果audio不是用户手动关闭的
      // 例如笔记本待机的话, 处理一下
      store.commit(SET_PLAYING, false)
    }

    // 歌曲加载好了, 才能播放下一首歌, 不然会报错
    const canplay = () => {
      const _songReady = songReady.value
      if (_songReady) return
      songReady.value = true
    }
    const loadstart = () => {
      songReady.value = false
    }
    // 如果出错啦, 也可以播放其他歌曲
    const error = () => {
      songReady.value = true
    }
    watch(currentPlaySong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return
      }
      const audioEl = audioRef.value
      // 如果歌曲没加载完, 在到下一首会报错
      audioEl.src = newSong.url
    })
    watch(songReady, (newVal) => {
      if (!newVal) return
      audioRef.value.play()
    })
    return {
      songReady,
      audioRef,
      fullScreen,
      currentPlaySong,
      back,
      pause,
      canplay,
      loadstart,
      error
    }
  }
})
</script>

<style
  lang="scss"
  scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: #222;

    .top {
      position: relative;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: 22px;
          color: #ffcd32;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
        color: #fff;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        height: 30px;
      }
    }
  }
}
</style>
