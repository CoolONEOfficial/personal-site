<template>
  <b-navbar-item
    :class="[
      'nav-item',
      { 'nav-item-selected': $route.path.includes(item.to) }
    ]"
    @click="onItemClicked"
  >
    <div class="columns is-mobile">
      <Picture
        class="image is-16x16 nav-item-image"
        :centered="true"
        :src="`/icons/black/icons8-${item.icon}-50.png`"
        fit="contain"
      />
      <div class="column nav-item-title">
        {{ $t(item.title) }}
      </div>
    </div>
  </b-navbar-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Picture from '~/components/Picture.vue'

@Component({
  components: { Picture }
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
      "hackathons": "Hackathons",
      "achievements": "Achievements",
      "projects": "Projects",
      "books": "Books",
      "events": "Events",
      "music": "Music",
      "feedback": "Feedback",
      "about": "About this site"
    },
    "ru": {
      "hackathons": "Хакатоны",
      "achievements": "Достижения",
      "projects": "Проекты",
      "books": "Книги",
      "events": "Мероприятия",
      "music": "Музыка",
      "feedback": "Обратная связь",
      "about": "О сайте"
    }
  }
</i18n>
