<template>
  <figure class="picture">
    <picture>
      <source
        :data-srcset.sync="srcsetWebp"
        :srcset.sync="srcsetWebp"
        type="image/webp"
      />
      <source
        :data-srcset.sync="srcset"
        :srcset.sync="srcset"
        :type="`image/${type}`"
      />
      <img
        :data-src.sync="srcset"
        :src.sync="srcset"
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
  value!: String

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

  get srcsetWebp() {
    return `${this.value}?webp`
  }

  get srcset() {
    return this.value
  }
}
</script>

<style lang="scss">
.picture {
  height: calc(100% - 8px);
  margin-bottom: -6px;
}
</style>
