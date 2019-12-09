<template>
  <header class="timeline-header">
    <span class="tag">{{ $dateFns.format(new Date(item.date).getTime(), 'yyyy') }}</span>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineItem } from "~/types/timeline";

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineItem
}
</script>

<style scoped lang="scss"></style>
