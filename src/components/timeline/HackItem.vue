<template>
  <Item
    :item="item"
    :icon="iconMap[item.place]"
    :subtitle="item.location.title[$i18n.locale]"
  >
    <Images :item="item" v-if="item.images" />
  </Item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineHack } from '~/types/timeline'
import Item from '~/components/timeline/Item.vue'
import Images from '~/components/timeline/content/Images.vue'

@Component({
  components: { Images, Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineHack

  iconMap = {
    1: 'gold-medal',
    2: 'silver-medal',
    3: 'bronze-medal'
  }
}
</script>
