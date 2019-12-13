<template>
  <div :class="['timeline', 'has-padding-top-20', { 'is-centered': !$device.isMobile }]">
    <Header emoji="👨‍💻" :emoji-top="true">
      To be continued...
    </Header>

    <component
      :is="i._type"
      v-for="(i, index) of value"
      :key="index"
      :item="i"
    />

    <Header emoji="👶">
      Born to code
    </Header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BookItem from '~/components/timeline/items/BookItem.vue'
import AchievementItem from '~/components/timeline/items/AchievementItem.vue'
import ProjectItem from '~/components/timeline/items/ProjectItem.vue'
import YearItem from '~/components/timeline/Year.vue'
import HackItem from '~/components/timeline/items/HackItem.vue'
import Header from '~/components/timeline/Header.vue'

@Component({
  components: {
    Header,
    books: BookItem,
    projects: ProjectItem,
    achievements: AchievementItem,
    years: YearItem,
    hacks: HackItem
  }
})
export default class extends Vue {
  @Prop()
  value
}
</script>

<style scoped lang="sass"></style>
