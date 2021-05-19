<template>
  <div class="singer" v-loading="loading">
    <IndexList :data="singerList" @goToSingerDetail="goToSingerDetail"></IndexList>
    <router-view :singer="singer"/>
  </div>
</template>

<script>
import { getSingerList } from '@/api'
import { computed, defineComponent, onMounted, ref } from 'vue'
import IndexList from '@/components/IndexList/IndexList'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Singer',
  components: { IndexList },
  setup () {
    const router = useRouter()
    const singer = ref({})
    const singerList = ref([])
    const _getSingerList = async () => {
      const res = await getSingerList()
      if (res.code === 0) {
        singerList.value = res.data.singers
      }
    }
    const loading = computed(() => {
      return !singerList.value.length
    })
    const goToSingerDetail = (item) => {
      console.log(item)
      singer.value = item
      router.push({
        path: `/singer/${item.mid}`
      })
    }
    onMounted(() => {
      _getSingerList()
    })

    return {
      singerList,
      loading,
      singer,
      goToSingerDetail
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

  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme
      }
    }
  }
}
</style>
