<template>
  <PageHeader/>
  <Tab/>
  <router-view/>
</template>
<script>
import PageHeader from '@/components/PageHeader'
import Tab from '@/components/Tab'

export default {
  components: { Tab, PageHeader }
}
</script>

<style
  lang="scss"
  scoped>

</style>
