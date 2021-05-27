import { shuffle } from '@/utils'
import { PLAY_MODE } from '@/utils/constant'

export default {
  /**
   * @param commit
   * @param list 播放歌单
   * @param index 播放歌单的index
   */
  selectPlay ({ commit }, { list, index }) {
    // 1. 设置播放模式
    // 2. 设置播放列表
    // 3. 设置播放状态
    // 4. 设置播放的index
    // 5. 设置全屏播放
    // 6. 设置真实的播放列表(因为可能是随机播放)
    commit('setPlayMode', PLAY_MODE.sqeuence)
    commit('setSequenceList', list)
    commit('setPlaying', true)
    commit('setCurrentPlayIndex', index)
    commit('setFullScreen', true)
    commit('setPlaylist', list)
  },
  randomPlay ({ commit }, list) {
    console.log(list)
    commit('setPlayMode', PLAY_MODE.random)
    commit('setSequenceList', list)
    commit('setPlaying', true)
    commit('setCurrentPlayIndex', 0)
    commit('setFullScreen', true)
    commit('setPlaylist', shuffle(list))
  }
}
