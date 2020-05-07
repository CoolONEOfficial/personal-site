<template>
  <Icon
    :icon="iconMap[linkLang]"
    :class="['image', 'is-32x32', 'icon-hover']"
    :clickable="true"
    @click="switchLang"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Icon from '~/components/Icon.vue'

@Component({
  components: { Icon }
})
export default class extends Vue {
  get linkLang() {
    return this.$i18n.locale === 'ru' ? 'en' : 'ru'
  }

  iconMap = {
    ru: 'russia-map',
    en: 'usa-map'
  }

  switchLang() {
    this.$i18n.setLocale(this.linkLang)
  }
}
</script>

<style scoped lang="scss"></style>
