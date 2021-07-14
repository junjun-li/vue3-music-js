<template>
  <div>
    <h1>test1</h1>
    <ul>
      <li
        v-for="item in list"
        :key="item.id">{{item.value}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    list: {
      type: Array
    }
  },
  created () {
    console.log('test1 created')
  },
  mounted () {
    console.log('test1 mounted')
  },
  beforeUpdate () {
    console.log('test1 beforeUpdate')
  },
  updated () {
    console.log('test1 updated')
  },
  beforeUnmount () {
    console.log('test1 beforeUnmount')
  },
  unmounted () {
    console.log('test1 unmounted')
  }
}
</script>

<style
  lang="scss"
  scoped>

</style>
