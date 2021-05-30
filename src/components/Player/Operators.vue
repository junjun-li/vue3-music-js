<template>
  <div class="operators">
    <div class="icon-wrapper">
      <SvgIcon
        class-name="icon"
        icon-class="sequence" />
    </div>
    <div
      :class="songReady ? '' : 'disabled'"
      class="icon-wrapper"
      @click="toggleSong('previous')">
      <SvgIcon
        class-name="icon"
        icon-class="previous" />
    </div>
    <div
      :class="songReady ? '' : 'disabled'"
      class="icon-wrapper play pause"
      @click="togglePlay">
      <SvgIcon
        v-show="!playing"
        class-name="icon"
        icon-class="play" />
      <SvgIcon
        v-show="playing"
        class-name="icon"
        icon-class="pause" />
    </div>
    <div
      :class="songReady ? '' : 'disabled'"
      class="icon-wrapper"
      @click="toggleSong('next')">
      <SvgIcon
        class-name="icon"
        icon-class="next" />
    </div>
    <div class="icon-wrapper">
      <SvgIcon
        class-name="icon"
        icon-class="favorites" />
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/SvgIcon'
import { SET_CURRENT_PLAY_INDEX, SET_PLAYING } from '@/store/mutations_types'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Operators',
  components: { SvgIcon },
  props: {
    audioRef: {
      type: Object,
      required: true
    },
    songReady: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const playing = computed(() => store.state.playing)
    const playlist = computed(() => store.state.playlist)
    const currentPlayIndex = computed(() => store.state.currentPlayIndex)

    // 暂停, 播放歌曲
    const togglePlay = () => {
      const audioEl = props.audioRef
      if (playing.value) {
        audioEl.pause()
      }
      else {
        audioEl.play()
      }
      store.commit(SET_PLAYING, !playing.value)
    }
    // 下一首, 上一首
    const toggleSong = (type) => {
      if (!props.songReady) {
        console.log('这首歌正在加载')
        return
      }
      const _playlist = playlist.value
      if (_playlist.length === 0) return
      // todo 这个待测试
      if (_playlist.length === 1) {
        loop()
        return
      }
      let index = currentPlayIndex.value
      if (type === 'next') {
        index += 1
        if (index > _playlist.length) {
          index = 0
        }
      }
      else if (type === 'previous') {
        index -= 1
        if (index === -1) {
          index = _playlist.length - 1
        }
      }
      store.commit(SET_CURRENT_PLAY_INDEX, index)
      store.commit(SET_PLAYING, true)
    }
    const loop = () => {
      // 如果只有一首歌, 从新播放
      const audioEl = props.audioRef
      audioEl.currentTime = 0
      audioEl.play()
    }
    return {
      playing,
      playlist,
      currentPlayIndex,
      togglePlay,
      toggleSong
    }
  }
})
</script>

<style
  lang="scss"
  scoped>

.operators {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .icon-wrapper {
    .icon {
      font-size: 30px;
      color: #F8CE55;
    }
  }

  .play, .pause {
    .icon {
      font-size: 40px;
    }
  }

  .disabled {
    .icon {
      color: #715505 !important;
    }
  }
}
</style>
