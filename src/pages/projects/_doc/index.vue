<template>
  <Description :page-item="getProjectPage" :subtitle="$t(getProjectPage.type)" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'
import Description from "~/components/hero/Description.vue";
const vuexModule = namespace(COLL_NAMES.PROJECTS)

@Component({
  components: { Description }
})
export default class extends Vue {
  @vuexModule.Getter
  getProjectPage
}
</script>

<i18n src="~/lang/projectsTypes.json"/>
