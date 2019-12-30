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

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  get subtitle() {
    const type = this.item.type
    const platform = this.item.platform
    return this.useFor(type, platform)
      ? `${this.capitalizeFirstLetter(this.$t(type))} ${this.$t(
          'for'
        )} ${this.$t(platform)}`
      : `${this.$t(platform)} ${this.$t(type)}`
  }

  useFor(type: ProjectType, platform: ProjectPlatform) {
    switch (platform) {
      case ProjectPlatform.MOBILE:
      case ProjectPlatform.DESKTOP:
      case ProjectPlatform.ANDROID:
      case ProjectPlatform.WEB:
        return false
      case ProjectPlatform.WINDOWS:
      case ProjectPlatform.LINUX:
      case ProjectPlatform.IOS:
      case ProjectPlatform.MACOSX:
        return true
    }
  }
}
</script>

<i18n src="~/lang/projectsTypes.json" />
