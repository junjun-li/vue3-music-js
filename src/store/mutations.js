import { __favoritesList__ } from '@/utils/constant'
import {
  SET_PLAYING,
  SET_SEQUENCE_LIST,
  SET_PLAYLIST,
  SET_PLAY_MODE,
  SET_CURRENT_PLAY_INDEX,
  SET_FULL_SCREEN,
  SET_FAVORITES_LIST
} from './mutations_types'
import storage from 'store'
const mutations = {
  [SET_PLAYING] (state, playing) {
    state.playing = playing
  },
  [SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [SET_PLAY_MODE] (state, mode) {
    state.playMode = mode
  },
  [SET_CURRENT_PLAY_INDEX] (state, index) {
    state.currentPlayIndex = index
  },
  [SET_FULL_SCREEN] (state, fullScreen) {
    state.fullScreen = fullScreen
  },
  [SET_FAVORITES_LIST] (state, list) {
    storage.set(__favoritesList__, list)
    state.favoritesList = list
  }
}

export default mutations
