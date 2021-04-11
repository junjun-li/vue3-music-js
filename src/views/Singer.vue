<template>
  <div class="singer">
    <IndexList :data="singerList"></IndexList>
  </div>
</template>

<script>
import { getSingerList } from '@/api'
import { defineComponent, onMounted, ref } from 'vue'
import IndexList from '@/components/IndexList/IndexList'

export default defineComponent({
  name: 'Singer',
  components: { IndexList },
  setup () {
    const singerList = ref([])
    const _getSingerList = async () => {
      const res = await getSingerList()
      if (res.code === 0) {
        singerList.value = res.data.singers
      }
    }
    onMounted(() => {
      _getSingerList()
    })

    return {
      singerList
    }
  }
})
</script>

<style
  lang="scss"
  scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
