<template>
  <Photos :page-item="getProjectPage" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'
import Description from '~/components/hero/Description.vue'
import Photos from '~/components/hero/Photos.vue'

const vuexModule = namespace(COLL_NAMES.PROJECTS)

@Component({
  components: { Photos, Description }
})
export default class extends Vue {
  @vuexModule.Getter
  getProjectPage
}
</script>
