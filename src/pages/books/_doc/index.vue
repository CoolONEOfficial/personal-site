<template>
  <Description :page-item="getBookPage" :subtitle="getBookPage.author" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'
import Description from '~/components/hero/Description.vue'
const vuexModule = namespace(COLL_NAMES.BOOKS)

@Component({
  components: { Description }
})
export default class extends Vue {
  @vuexModule.Getter
  getBookPage
}
</script>

<style scoped lang="scss"></style>
