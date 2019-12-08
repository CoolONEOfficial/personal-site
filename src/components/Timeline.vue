<template>
  <div class="timeline is-centered">
    <div class="timeline-header">
      <div class="tag is-medium is-primary">To be continued...</div>
    </div>
    <!--    <header class="timeline-header">-->
    <!--      <span class="tag is-medium is-primary">Start</span>-->
    <!--    </header>-->
    <!--    <div class="timeline-item">-->
    <!--      <div class="timeline-marker"></div>-->
    <!--      <div class="timeline-content">-->
    <!--        <p class="heading">January 2016</p>-->
    <!--        <p>Timeline content - Can include any HTML element</p>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="timeline-item">-->
    <!--      <div class="timeline-marker is-image is-32x32">-->
    <!--        <img src="http://bulma.io/images/placeholders/32x32.png" />-->
    <!--      </div>-->
    <!--      <div class="timeline-content">-->
    <!--        <p class="heading">February 2016</p>-->
    <!--        <p>Timeline content - Can include any HTML element</p>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <header class="timeline-header">-->
    <!--      <span class="tag is-primary">2017</span>-->
    <!--    </header>-->
    <component
      :is="i.type"
      v-for="(i, index) of value"
      :key="index"
      :item="i"
    />
    <!--    <div class="timeline-item">-->
    <!--      <div class="timeline-marker is-icon">-->
    <!--        <i class="fa fa-flag"></i>-->
    <!--      </div>-->
    <!--      <div class="timeline-content">-->
    <!--        <p class="heading">March 2017</p>-->
    <!--        <p>Timeline content - Can include any HTML element</p>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="timeline-header">
      <div class="tag">2002</div>
    </div>
    <div class="timeline-header">
      <div class="tag is-large">Born to code 👶</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BookItem from '~/components/timeline/BookItem.vue'
import AchievementItem from '~/components/timeline/AchievementItem.vue'
import ProjectItem from '~/components/timeline/ProjectItem.vue'
import YearItem from '~/components/timeline/YearItem.vue'
import HackItem from '~/components/timeline/HackItem.vue'

@Component({
  components: {
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
