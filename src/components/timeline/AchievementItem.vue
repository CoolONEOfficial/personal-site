<template>
  <Item :item="item" :icon="item.icon">
    achievement content
  </Item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineAchievement } from '~/types/timeline'
import Item from '~/components/timeline/Item.vue'

@Component({
  components: { Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineAchievement
}
</script>

<style scoped lang="scss"></style>
