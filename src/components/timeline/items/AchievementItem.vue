<template>
  <Item :item="item" :icon="item.type" :subtitle="$t(item.type)" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Item from '~/components/timeline/Item.vue'
import { TimelineAchievement } from "~/types/items/achievement";

@Component({
  components: { Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineAchievement
}
</script>

<style scoped lang="scss"></style>

<i18n>
  {
    "en": {
      "certificate": "Certificate",
      "diploma": "Diploma",
      "other": "Other"
    },
    "ru": {
      "certificate": "Сертификат",
      "diploma": "Диплом",
      "other": "Другое"
    }
  }
</i18n>
