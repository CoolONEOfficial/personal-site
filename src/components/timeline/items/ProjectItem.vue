<template>
  <Item
    :icon="iconMap[item.category]"
    :item="item"
    :subtitle="
      $t(item.category)
    "
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Item from '~/components/timeline/Item.vue'
import { TimelineProject } from "~/types/items/project";

@Component({
  components: { Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineProject

  iconMap = {
    game: 'game-controller',
    mobile_app: 'smartphone-tablet'
  }
}
</script>

<i18n>
  {
    "en": {
      "game": "Computer game",
      "mobile_app": "Mobile app"
    },
    "ru": {
      "game": "Игра",
      "mobile_app": "Мобильное приложение"
    }
  }
</i18n>
