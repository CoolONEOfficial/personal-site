<template>
  <Item :item="item" :icon="iconMap[item.place]" :subtitle="item.location.title[$i18n.locale]">
    hack content
  </Item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineHack } from '~/types/timeline'
import Item from '~/components/timeline/Item.vue'

@Component({
  components: { Item }
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

<style scoped lang="scss"></style>
