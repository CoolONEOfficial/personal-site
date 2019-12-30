<template>
  <Icon
    icon="invert-colors"
    :class="['image', 'is-32x32', 'icon-hover']"
    @click="vantaBlack"
    :clickable="true"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Action } from '~/node_modules/nuxt-property-decorator'
import Icon from '~/components/Icon.vue'

@Component({
  components: { Icon }
})
export default class extends Vue {
  @Action
  switchTheme

  vantaBlack() {
    this.switchTheme()
  }
}
</script>

<style scoped lang="scss"></style>
