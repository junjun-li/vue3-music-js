import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import(/* webpackChunkName: "recommend" */ '@/views/Recommend')
const Search = () => import(/* webpackChunkName: "search" */ '@/views/Search')
const Singer = () => import(/* webpackChunkName: "singer" */ '@/views/Singer')
const TopList = () => import(/* webpackChunkName: "top-list" */ '@/views/TopList')
const SingerDetail = () => import(/* webpackChunkName: "top-list" */ '@/views/SingerDetail')

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    component: TopList
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
