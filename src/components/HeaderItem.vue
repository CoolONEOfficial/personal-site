<template>
  <b-navbar-item>
    <nuxt-link :to="localePath(item.to)">
      <div class="columns">
        <figure class="image is-16x16 item-image">
          <img :src="`icons/black/icons8-${item.icon}-50.png`" />
        </figure>
        <div class="column">
          {{ $t(item.title) }}
        </div>
      </div>
    </nuxt-link>
  </b-navbar-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ required: true })
  item
}
</script>

<style scoped lang="scss">
.columns {
  display: flex;
}

.item-image {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 0.75em;
}
</style>

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
