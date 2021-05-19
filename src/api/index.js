import axios from '@/utils/request'

export const getRecommend = () => axios.get('/api/getRecommend')

export const getSingerList = () => axios.get('/api/getSingerList')

export const getSingerDetail = (mid) => axios.get('/api/getSingerDetail', {
  params: {
    mid
  }
})

export const processSongs = (songs) => {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  const mid = songs.map((song) => {
    return song.mid
  })
  return axios.get('/api/getSongsUrl', {
    params: {
      mid
    }
  }).then((result) => {
    const map = result.data.map
    return songs.map((song) => {
      song.url = map[song.mid]
      return song
    }).filter((song) => {
      return song.url && song.url.indexOf('vkey') > -1
    })
  })
}
