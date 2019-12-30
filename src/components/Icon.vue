<template>
  <Picture
    :class="['icon', { 'icon-clickable': clickable }]"
    @click="onClick"
    v-model="src"
    :fit="fit"
    :alt="alt"
  />
</template>

<script lang="ts">
import { Component, Getter, Prop, Vue } from 'nuxt-property-decorator'
import Picture from '~/components/Picture.vue'

@Component({
  components: { Picture }
})
export default class extends Vue {
  @Prop({ required: true })
  icon!: String

  @Prop()
  fit

  @Prop()
  alt

  @Prop({ default: true })
  invert

  @Prop({ default: false })
  clickable

  @Getter
  getTheme

  @Getter
  getThemeInvert

  get src() {
    return `/icons/${
      (this.invert ? this.getThemeInvert : this.getTheme).name
    }/icons8-${this.icon}-50.png`
  }

  onClick() {
    this.$emit('click')
  }
}
</script>

<style lang="scss">
.icon {
  &-clickable {
    cursor: pointer;
  }
}
</style>
