<template>
  <figure class="picture">
    <picture>
      <source :data-srcset="`${src}?webp`" type="image/webp" />
      <source :data-srcset="src" :type="`image/${type}`" />
      <img
        :data-src="src"
        :class="['lazyload']"
        :style="`width: 100%; height: 100%; object-fit: ${fit};`"
        @click="onImageClick"
        :alt="alt"
      />
    </picture>
  </figure>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ required: true })
  src!: String

  @Prop({ default: 'jpg' })
  type

  @Prop({ default: 'cover' })
  fit

  @Prop({ default: false })
  centered

  @Prop()
  alt

  onImageClick() {
    this.$emit('click')
  }
}
</script>

<style lang="scss">
.picture {
  height: calc(100% - 8px);
  margin-bottom: -6px;
}
</style>
