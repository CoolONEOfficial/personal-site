<template>
  <section>
    <p class="title has-text-centered" data-aos="fade">
      {{ $t('chronology') }}
    </p>
    <Timeline
      class="has-margin-top-60 has-margin-bottom-50"
      v-model="getTimelineItems"
    />
  </section>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Timeline from '~/components/Timeline.vue'
import { Jsonld } from '~/node_modules/nuxt-jsonld'
import { JSON_LD } from '~/util/seo'
import { LOGO_IMAGE } from '~/util/constants'

const vuexModule = namespace('timeline')

@Jsonld
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

  jsonld() {
    return {
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      name: this.$t('name'),
      url: 'https://coolone.ru',
      author: JSON_LD.PERSON,
      image: LOGO_IMAGE
    }
  }
}
</script>

<i18n>
  {
    "en": {
      "name": "Website portfolio of Nikolai Trukhin",
      "chronology": "Chronology"
    },
    "ru": {
      "name": "Cайт-портфолио Николая Трухина",
      "chronology": "Хронология"
    }
  }
</i18n>
