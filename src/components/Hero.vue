<template>
  <section class="hero is-fullheight-with-navbar">
    <div
      :class="
        $device.isMobile ? ['hero-head', 'has-padding-left-15', 'has-padding-right-15'] : ['hero-body']
      "
    >
      <slot />
    </div>
    <div class="hero-foot" v-if="items.length > 1">
      <div class="columns justify-center has-margin-bottom-20">
        <HeroItem v-for="(i, index) of items" :key="index" :item="i" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import HeroItem from '~/components/HeroItem.vue'
import { TimelineItem } from '~/types/timeline'

@Component({
  components: { HeroItem }
})
export default class extends Vue {
  @Prop({ required: true })
  doc!: String

  @Prop({ required: true })
  item!: TimelineItem | any

  get items() {
    return [
      {
        title: 'description',
        icon: 'info',
        visible: true,
        to: {
          name: `${this.item._type}-doc`,
          params: { doc: this.$route.params.doc }
        }
      },
      {
        title: 'photos',
        icon: 'image-gallery',
        visible: Boolean(this.item.images),
        to: {
          name: `${this.item._type}-doc-photos`,
          params: { doc: this.$route.params.doc }
        }
      },
      {
        title: 'videos',
        visible: Boolean(this.item.youtube),
        icon: 'video-gallery',
        to: {
          name: `${this.item._type}-doc-videos`,
          params: { doc: this.$route.params.doc }
        }
      }
    ].filter((item) => item.visible)
  }
}
</script>
