<template>
  <Item
    :item="item"
    icon="book"
    :subtitle="item.author"
    style="white-space: nowrap"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineBook } from '~/types/timeline'
import Item from '~/components/timeline/Item.vue'

@Component({
  components: { Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineBook
}
</script>

<style scoped lang="scss"></style>
