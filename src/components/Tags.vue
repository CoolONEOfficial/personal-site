<template>
  <b-taglist v-if="Boolean(value)" attached class="is-marginless">
    <Tag v-for="(i, index) of value.slice(0, max)" :key="index">
      {{ i }}
    </Tag>
    <Tag v-if="value.length > max">
      <b-dropdown aria-role="list" position="is-bottom-left">
        <p slot="trigger" role="button">+{{ value.length - max }}</p>
        <Tag v-for="(i, index) of value.slice(max)" :key="index">
          {{ i }}
        </Tag>
      </b-dropdown>
    </Tag>
  </b-taglist>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Tag from '~/components/Tag.vue'

@Component({
  components: { Tag }
})
export default class extends Vue {
  @Prop()
  value!: String[]

  @Prop({ default: 2 })
  max!: number
}
</script>

<style scoped lang="scss">
</style>
