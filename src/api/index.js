import axios from '@/utils/request'

export const getRecommend = () => axios.get('/api/getRecommend')

export const getSingerList = () => axios.get('/api/getSingerList')

export const getSingerDetail = (singer) => axios.get('/api/getSingerDetail', {
  params: {
    mid: singer.mid
  }
})
