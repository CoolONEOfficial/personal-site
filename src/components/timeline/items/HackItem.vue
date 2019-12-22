<template>
  <Item
    :item="item"
    :icon="iconMap[item.place]"
    :subtitle="item.location.title[$i18n.locale]"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Item from '~/components/timeline/Item.vue'
import Images from '~/components/timeline/items/content/Images.vue'
import { TimelineHack } from "~/types/items/events/hack";

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
