<template>
  <Description :page-item="getEventPage" :subtitle="subtitle" />
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

  get subtitle() {
    return this.getEventPage.location
      ? this.getEventPage.location.title[this.$i18n.locale]
      : this.$t(this.getEventPage.type)
  }
}
</script>

<style scoped lang="scss"></style>

<i18n src="~/lang/eventsTypes.json" />
