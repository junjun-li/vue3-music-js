import { PLAY_MODE } from '@/utils/constant'

const state = {
  // 歌曲列表
  sequenceList: [],
  // 真实的播放列表
  playlist: [],
  // 是否正在播放
  playing: false,
  // 播放模式
  playMode: PLAY_MODE.sequence,
  // 当前的播放索引
  currentPlayIndex: 0,
  // 播放器是否全局展开
  fullScreen: false
}
export default state
