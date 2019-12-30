<template>
  <Item :icon="icon" :item="item" :subtitle="subtitle" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Item from '~/components/timeline/Item.vue'
import {
  ProjectPlatform,
  ProjectType,
  TimelineProject
} from '~/types/items/project'

@Component({
  components: { Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineProject

  get subtitle() {
    return TimelineProject.getSubtitle(
      this.$t(this.item.type),
      this.$t('for'),
      this.$t(this.item.platform),
      this.item.platform
    )
  }

  get icon() {
    switch (this.item.type) {
      case ProjectType.APP:
        switch (this.item.platform) {
          case ProjectPlatform.MOBILE:
            return 'smartphone-tablet'
          case ProjectPlatform.DESKTOP:
            return 'workstation'
          case ProjectPlatform.WEB:
            return 'website'
          case ProjectPlatform.WINDOWS:
            return 'windows8'
          case ProjectPlatform.LINUX:
            return 'linux'
          case ProjectPlatform.MACOSX:
            return 'mac-logo'
          case ProjectPlatform.ANDROID:
            return 'android-os'
          case ProjectPlatform.IOS:
            return 'ios-logo'
        }
        break
      case ProjectType.GAME:
        return 'game-controller'
    }
    return
  }
}
</script>

<i18n src="~/lang/projectsTypes.json" />
