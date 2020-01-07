<template>
  <div
    :class="[
      'timeline',
      'has-padding-top-20',
      { 'is-centered': !$device.isMobile }
    ]"
  >
    <Header emoji="👨‍💻" :emoji-top="true">
      {{ $t('future') }}
    </Header>

    <component
      :is="i._type"
      v-for="(i, index) of getTimelineItems"
      :key="index"
      :item="i"
    />

    <client-only>
      <infinite-loading @infinite="loadMore">
        <div slot="no-more" />
        <div slot="no-results" />
      </infinite-loading>
    </client-only>

    <Header v-if="noMore" emoji="👶">
      {{ $t('birth') }}
    </Header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BookItem from '~/components/timeline/items/BookItem.vue'
import AchievementItem from '~/components/timeline/items/AchievementItem.vue'
import ProjectItem from '~/components/timeline/items/ProjectItem.vue'
import YearItem from '~/components/timeline/Year.vue'
import Header from '~/components/timeline/Header.vue'
import EventItem from '~/components/timeline/items/EventItem.vue'
import { namespace } from '~/node_modules/nuxt-property-decorator'

const vuexModule = namespace('timeline')

@Component({
  components: {
    Header,
    books: BookItem,
    projects: ProjectItem,
    achievements: AchievementItem,
    years: YearItem,
    events: EventItem
  }
})
export default class extends Vue {
  @vuexModule.Getter
  getTimelineItems

  @vuexModule.Action
  loadTimelineItems

  noMore = false

  async loadMore($state) {
    if((await this.loadTimelineItems()).length > 0) {
      $state.loaded()
    } else {
      $state.complete()
      this.noMore = true
    }
  }
}
</script>

<i18n>
  {
    "en": {
      "birth": "Born to code",
      "future": "To be continued..."
    },
    "ru": {
      "birth": "Рожден кодить",
      "future": "Продолжение следует..."
    }
  }
</i18n>
