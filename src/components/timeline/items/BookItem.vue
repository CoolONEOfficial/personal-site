<template>
  <Item
    :item="item"
    icon="book"
    :subtitle="item.author"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Item from '~/components/timeline/Item.vue'
import { TimelineBook } from "~/types/items/book";

@Component({
  components: { Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineBook
}
</script>

<style scoped lang="scss"></style>
