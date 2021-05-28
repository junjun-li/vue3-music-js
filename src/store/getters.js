export default {
  currentPlaySong: (state) => {
    return state.playlist[state.currentPlayIndex] || {}
  }
}
