<template>
  <PageHeader/>
  <Tab/>
  <Player />
  <router-view/>
</template>
<script>
import PageHeader from '@/components/PageHeader'
import Player from '@/components/Player/Player'
import Tab from '@/components/Tab'

export default {
  components: { Player, Tab, PageHeader }
}
</script>

<style
  lang="scss"
  scoped>

</style>
