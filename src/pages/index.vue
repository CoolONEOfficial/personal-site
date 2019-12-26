<template>
  <section>
    <p class="title has-text-centered has-padding-top-50">Хронология</p>
    <Timeline class="has-margin-top-40 has-margin-bottom-50" v-model="getTimelineItems" />
  </section>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Timeline from '~/components/Timeline.vue'

const vuexModule = namespace('timeline')

@Component({
  components: { Timeline }
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
