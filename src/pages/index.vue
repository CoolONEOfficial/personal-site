<template>
  <section>
    <Timeline v-model="getTimelineItems" />
  </section>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Card from '~/components/Card.vue'
import Timeline from '~/components/Timeline.vue'

const vuexModule = namespace('timeline')

@Component({
  components: { Timeline, Card }
})
export default class extends Vue {
  @vuexModule.Getter
  getTimelineItems

  async fetch({ store, app }) {
    try {
      await store.dispatch('timeline/loadTimelineItems')
    } catch (e) {
      console.error('error! ', e)
    }
  }
}
</script>

<i18n>
  {
    "en": {
      "welcome": "Localized welcome!"
    },
    "ru": {
      "welcome": "Локализированный текст!"
    }
  }
</i18n>
