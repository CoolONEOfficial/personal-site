<template>
  <section>
    <p class="title has-text-centered" data-aos="fade">
      {{ $t('chronology') }}
    </p>
    <Timeline
      class="has-margin-top-60 has-margin-bottom-50"
    />
  </section>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import Timeline from '~/components/Timeline.vue'
import { Jsonld } from '~/node_modules/nuxt-jsonld'
import { JSON_LD } from '~/util/seo'
import { LOGO_IMAGE, VUEX_NAMES } from "~/util/constants";

const vuexModule = namespace(VUEX_NAMES.TIMELINE)

@Jsonld
@Component({
  components: { Timeline }
})
export default class extends Vue {
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
      "name": "Nikolay Trukhin's site",
      "chronology": "Chronology"
    },
    "ru": {
      "name": "Cайт Николая Трухина",
      "chronology": "Хронология"
    }
  }
</i18n>
