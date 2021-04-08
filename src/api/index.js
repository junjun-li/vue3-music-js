import axios from '@/utils/request'

export const getRecommend = () => axios.get('/api/getRecommend')
