<template>
  <Hero :doc="$route.params.doc" :item="getAchievementPage">
    <nuxt />
  </Hero>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Hero from '~/components/Hero.vue'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES, LOGO_IMAGE } from '~/util/constants'
import {
  getArticle,
  getMetaPage,
  getTitle
} from '~/util/seo'
import { Jsonld } from '~/node_modules/nuxt-jsonld'
import { PageAchievement } from '~/types/items/achievement'

const COLL_NAME = COLL_NAMES.ACHIEVEMENTS
const vuexModule = namespace(COLL_NAME)

@Jsonld
@Component({
  components: { Hero }
})
export default class extends Vue {
  @vuexModule.Getter
  getAchievementPage!: PageAchievement

  async fetch({ store, params }) {
    try {
      await store.dispatch(`${COLL_NAME}/loadAchievementPage`, params.doc)
    } catch (e) {
      console.error('error! ', e)
    }
  }

  head() {
    const locale = this.$i18n.locale
    return {
      title: {
        title: getTitle(locale, this.getAchievementPage.title[locale]),
        locale: locale
      },
      meta: getMetaPage(this.$i18n.locale, this.getAchievementPage)
    }
  }

  jsonld() {
    return getArticle(
      this,
      this.$i18n.locale,
      COLL_NAME,
      this.getAchievementPage,
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: this.getAchievementPage.type
      }
    )
  }
}
</script>

<i18n src="~/lang/achievements.json" />
