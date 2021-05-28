import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/index.scss'
import lazyPlugin from 'vue3-lazy'
import directives from '@/utils/directives'
import '@/components/SvgIcon/index'
import SvgIcon from '@/components/SvgIcon/SvgIcon'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(store)
app.use(router)
app.use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
})

Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key])
})

app.mount('#app')
