<template>
  <Item
    :item="item"
    :icon="icon"
    :subtitle="item.location.title[$i18n.locale]"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Item from '~/components/timeline/Item.vue'
import Images from '~/components/timeline/items/content/Images.vue'
import { TimelineHack } from '~/types/items/events/hack'
import { EventType, TimelineEvent } from '~/types/items/event'

@Component({
  components: { Images, Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineEvent

  get icon() {
    switch (this.item.type) {
      case EventType.OTHER:
        break
      case EventType.HACK:
        return {
          1: 'gold-medal',
          2: 'silver-medal',
          3: 'bronze-medal'
        }[(this.item as TimelineHack).place]
      case EventType.TRAINING:
      case EventType.COURSE:
        return 'course'
    }
    return 'calendar'
  }
}
</script>
