<template>
  <div
    class="description has-margin-10"
    v-html="$md.render(item.description)"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Prop } from '~/node_modules/nuxt-property-decorator'
import { TimelineItem } from '~/types/timeline'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineItem
}
</script>

<style scoped lang="scss">
.description {
  text-align: justify;
}
</style>
