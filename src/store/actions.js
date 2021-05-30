import { shuffle } from '@/utils'
import { PLAY_MODE } from '@/utils/constant'
import {
  SET_PLAYING,
  SET_SEQUENCE_LIST,
  SET_PLAYLIST,
  SET_PLAY_MODE,
  SET_CURRENT_PLAY_INDEX,
  SET_FULL_SCREEN,
  SET_FAVORITE_LIST
} from './mutations_types'
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
    commit(SET_PLAY_MODE, PLAY_MODE.sequence)
    commit(SET_SEQUENCE_LIST, list)
    commit(SET_PLAYING, true)
    commit(SET_CURRENT_PLAY_INDEX, index)
    commit(SET_FULL_SCREEN, true)
    commit(SET_PLAYLIST, list)
  },
  randomPlay ({ commit }, list) {
    commit(SET_PLAY_MODE, PLAY_MODE.random)
    commit(SET_SEQUENCE_LIST, list)
    commit(SET_PLAYING, true)
    commit(SET_CURRENT_PLAY_INDEX, 0)
    commit(SET_FULL_SCREEN, true)
    commit(SET_PLAYLIST, shuffle(list))
  }
}
