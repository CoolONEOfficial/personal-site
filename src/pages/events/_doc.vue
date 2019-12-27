<template>
  <Hero :doc="$route.params.doc" :item="getEventPage">
    <nuxt />
  </Hero>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Hero from '~/components/Hero.vue'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'
import { getArticle, getMetaPage } from '~/util/seo'
import { Jsonld } from '~/node_modules/nuxt-jsonld'
import { EventType, PageEvent } from '~/types/items/event'

const COLL_NAME = COLL_NAMES.EVENTS
const vuexModule = namespace(COLL_NAME)

@Jsonld
@Component({
  components: { Hero }
})
export default class extends Vue {
  @vuexModule.Getter
  getEventPage!: PageEvent

  async fetch({ store, params }) {
    try {
      await store.dispatch(`${COLL_NAME}/loadEventPage`, params.doc)
    } catch (e) {
      console.error('error! ', e)
    }
  }

  head() {
    return {
      title: {
        title: this.getEventPage.title[this.$i18n.locale],
        locale: this.$i18n.locale
      },
      meta: getMetaPage(this.$i18n.locale, this.getEventPage)
    }
  }

  jsonld() {
    let type = 'Event'
    switch (this.getEventPage.type) {
      case EventType.EXHIBITION:
        type = 'ExhibitionEvent'
        break
      case EventType.FESTIVAL:
        type = 'Festival'
        break
    }

    return getArticle(this, this.$i18n.locale, COLL_NAME, this.getEventPage, {
      '@type': type,
      location: this.getEventPage.location
        ? {
            '@type': 'Place',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: this.getEventPage.location.geopoint.latitude,
              longitude: this.getEventPage.location.geopoint.longitude
            },
            name: this.getEventPage.location.title[this.$i18n.locale]
          }
        : undefined
    })
  }
}
</script>

<i18n src="~/lang/events.json" />
