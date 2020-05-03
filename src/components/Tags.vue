<template>
  <b-taglist v-if="Boolean(value)" attached class="is-marginless">
    <Tag v-for="(i, index) of value.slice(0, max)" :key="index" :link="`/tag/${i}`">
      {{ i }}
    </Tag>
    <Tag v-if="value.length > max">
      <b-dropdown aria-role="list" position="is-bottom-right" :mobile-modal="false">
        <p slot="trigger" role="button">+{{ value.length - max }}</p>
        <b-dropdown-item aria-role="listitem" class="dropdown-tags">
          <Tag v-for="(i, index) of value.slice(max)" :key="index" :link="`/tag/${i}`">
            {{ i }}
          </Tag>
        </b-dropdown-item>
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
  .dropdown-tags {
    position: absolute;
    transform: translateY(5px);
    z-index: 1;
  }
</style>
