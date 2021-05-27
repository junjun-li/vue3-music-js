export default {
  currentPlaySong: (state) => {
    return state.playList[state.currentPlayIndex]
  }
}
