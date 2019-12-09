<template>
  <div :class="['timeline', { 'is-centered': !$device.isMobile }]">
    <Header class="is-medium">
      To be continued...
    </Header>

    <component
      :is="i.type"
      v-for="(i, index) of value"
      :key="index"
      :item="i"
    />

    <Header class="is-large">
      Born to code 👶
    </Header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BookItem from '~/components/timeline/BookItem.vue'
import AchievementItem from '~/components/timeline/AchievementItem.vue'
import ProjectItem from '~/components/timeline/ProjectItem.vue'
import YearItem from '~/components/timeline/YearItem.vue'
import HackItem from '~/components/timeline/HackItem.vue'
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
