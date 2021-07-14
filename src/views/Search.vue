<!-- eslint-disable -->
<template>
  <div>
    <button @click="push">push</button>
    <test1 :list="list" />
  </div>
</template>

<script>
import test1 from './test1'

export default {
  name: 'Search',
  components: { test1 },
  data () {
    return {
      list: [
        {
          id: 1,
          value: '标题1'
        },
        {
          id: 2,
          value: '标题2'
        }
      ]
    }
  },
  methods: {
    push () {
      this.list.push({
        id: 3,
        value: '标题3'
      })
    }
  },
  created () {
    console.log('search created')
  },
  mounted () {
    console.log('search mounted')
  },
  beforeUpdate () {
    console.log('search beforeUpdate')
  },
  updated () {
    console.log('search updated')
  },
  beforeUnmount () {
    console.log('search beforeUnmount')
  },
  unmounted () {
    console.log('search unmounted')
  }
}
</script>

<style
  lang="scss"
  scoped>

</style>
