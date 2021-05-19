<template>
  <ul class="song-list">
    <li
      v-for="song in songs"
      :key="song.id"
      class="item">
      <div class="content">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ getDesc(song) }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const getDesc = (song) => {
      return `${song.singer}·${song.album}`
    }
    return {
      getDesc
    }
  }
})
</script>

<style
  lang="scss"
  scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;

    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        @include no-wrap();
        color: $color-text
      }

      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>
