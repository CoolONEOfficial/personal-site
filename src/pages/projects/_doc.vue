<template>
  <Hero :doc="$route.params.doc" :item="getProjectPage">
    <nuxt />
  </Hero>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Hero from '~/components/Hero.vue'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { VUEX_NAMES } from "~/util/constants";
import { getArticle, getMetaPage } from '~/util/seo'
import { Jsonld } from '~/node_modules/nuxt-jsonld'
import {
  PageProject,
  ProjectPlatform,
  ProjectType
} from '~/types/items/project'

const VUEX_NAME = VUEX_NAMES.PROJECTS
const vuexModule = namespace(VUEX_NAME)

@Jsonld
@Component({
  components: { Hero }
})
export default class extends Vue {
  @vuexModule.Getter
  getProjectPage!: PageProject

  async fetch({ store, params }) {
    try {
      await store.dispatch(`${VUEX_NAME}/loadProjectPage`, params.doc)
    } catch (e) {
      console.error('error! ', e)
    }
  }

  head() {
    return {
      title: {
        title: this.getProjectPage.title[this.$i18n.locale],
        locale: this.$i18n.locale
      },
      meta: getMetaPage(this.$i18n.locale, this.getProjectPage)
    }
  }

  jsonld() {
    let type = 'SoftwareApplication'
    if (this.getProjectPage.type == ProjectType.GAME) type = 'VideoGame'
    else
      switch (this.getProjectPage.platform) {
        case ProjectPlatform.MOBILE:
          type = 'MobileApplication'
          break
        case ProjectPlatform.WEB:
          type = 'MobileApplication'
          break
      }

    return getArticle(this, this.$i18n.locale, VUEX_NAME, this.getProjectPage, {
      '@type': type
    })
  }
}
</script>

<i18n src="~/lang/projects.json" />
