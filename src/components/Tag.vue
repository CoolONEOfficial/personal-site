<template>
  <component :is="link ? 'nuxt-link' : 'div'" :to="link">
    <b-tag
      :class="`hover-${getType === 'is-dark' ? 'light' : 'dark'} is-marginless tag`"
      :type="getType"
    >
      <slot />
    </b-tag>
  </component>
</template>

<script lang="ts">
import { Component, Getter, Prop, Vue } from 'nuxt-property-decorator'
import { THEMES } from '~/types/theme'

@Component({})
export default class extends Vue {
  @Prop()
  type

  @Prop({ default: undefined })
  link

  @Getter
  getTheme

  get getType() {
    return this.type
      ? this.type
      : this.getTheme.name === THEMES.BLACK.name
      ? 'is-dark'
      : undefined
  }
}
</script>

<style scoped lang="scss">
  .tag {
    margin-left: 0.5px !important;
    margin-right: 0.5px !important;
  }
</style>
