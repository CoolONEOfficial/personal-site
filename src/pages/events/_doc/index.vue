<template>
  <Description :page-item="getEventPage" :subtitle="getEventPage.location.title[$i18n.locale]" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'
import Description from '~/components/hero/Description.vue'
const vuexModule = namespace(COLL_NAMES.EVENTS)

@Component({
  components: { Description }
})
export default class extends Vue {
  @vuexModule.Getter
  getEventPage
}
</script>

<style scoped lang="scss"></style>
