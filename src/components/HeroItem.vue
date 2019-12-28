<template>
  <div
    :class="[
      'columns',
      'is-mobile',
      'is-marginless',
      'nav-item',
      { 'nav-item-selected': $route.path === localePath(item.to.name) }
    ]"
    @click="onItemClicked"
  >
    <Icon
      class="image is-16x16 nav-item-image"
      :icon="item.icon"
      :centered="true"
      fit="contain"
      alt="Icon of hero item"
    />
    <div class="column nav-item-title">
      {{ $t(item.title) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Picture from '~/components/Picture.vue'
import Icon from "~/components/Icon.vue";

@Component({
  components: { Icon, Picture }
})
export default class extends Vue {
  @Prop({ required: true })
  item

  onItemClicked() {
    this.$router.push(this.localePath(this.item.to))
  }
}
</script>

<i18n>
  {
    "en": {
      "description": "Description",
      "photos": "Photos",
      "videos": "Videos"
    },
    "ru": {
      "description": "Описание",
      "photos": "Фото",
      "videos": "Видео"
    }
  }
</i18n>
