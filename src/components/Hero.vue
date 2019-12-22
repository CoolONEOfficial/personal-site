<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <slot />
    </div>
    <div class="hero-foot">
      <div class="columns justify-center has-margin-bottom-20">
        <HeroItem v-for="(i, index) of items" :key="index" :item="i" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import HeroItem from "~/components/HeroItem.vue";
import { TimelineItem } from "~/types/timeline";

@Component({
  components: { HeroItem }
})
export default class extends Vue {
  @Prop({ required: true })
  doc!: String

  @Prop({ required: true })
  item!: TimelineItem

  get items() {
    return [
      {
        title: 'description',
        icon: 'info',
        to: {
          name: `${this.item._type}-doc`,
          params: { doc: this.$route.params.doc }
        }
      },
      {
        title: 'photos',
        icon: 'image-gallery',
        to: {
          name: `${this.item._type}-doc-photos`,
          params: { doc: this.$route.params.doc }
        }
      },
      {
        title: 'videos',
        icon: 'video-gallery',
        to: {
          name: `${this.item._type}-doc-videos`,
          params: { doc: this.$route.params.doc }
        }
      }
    ]
  }
}
</script>
