<template>
  <div class="container has-text-centered">
    <h1 class="title">
      {{ getAchievementPage.title[$i18n.locale] }}
    </h1>
    <h2 class="subtitle">
      Subtitle
    </h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'
const vuexModule = namespace(COLL_NAMES.ACHIEVEMENTS)

@Component({})
export default class extends Vue {
  @vuexModule.Getter
  getAchievementPage
}
</script>

<style scoped lang="scss"></style>
