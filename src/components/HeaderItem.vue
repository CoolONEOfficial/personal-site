<template>
  <b-navbar-item
    :class="['nav-item', { selected: $route.path.includes(item.to) }]"
    @click="onItemClicked"
  >
    <div class="columns">
      <figure class="image is-16x16 item-image">
        <img :src="`/icons/black/icons8-${item.icon}-50.png`" />
      </figure>
      <div class="column">
        {{ $t(item.title) }}
      </div>
    </div>
  </b-navbar-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ required: true })
  item

  onItemClicked() {
    this.$router.push(this.localePath(this.item.to))
  }
}
</script>

<style scoped lang="scss">
.columns {
  display: flex;
}

.column {
  transition: color .3s linear;
}

.item-image {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: .75em;
  opacity: .6;
  transition: opacity .3s linear;
}

.nav-item {
  margin-top: 1em;
  margin-bottom: 1em;
  transition: background .3s linear;
}

.selected {
  background: hsl(0, 0%, 98%);
}

.nav-item:hover {
  background: hsl(0, 0%, 96%) !important;
}

.selected,
.nav-item:hover {
  .item-image {
    opacity: 1 !important;
  }

  .column {
    color: #4a4a4a !important;
  }
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
