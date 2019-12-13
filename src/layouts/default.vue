<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item>
          <img
            src="favicon.jpg"
            style="border-radius: 50%;"
            alt="Favicon image"
            class="has-margin-right-10"
          />
          <div>
            <h1 class="title is-5">{{ $t('initials') }}</h1>
            <div class="columns is-marginless">
              <div class="tag-text tags has-addons is-marginless logo-subtitle">
                <span class="tag hover-light is-dark is-marginless">Web</span>
                <span class="tag hover-dark is-primary is-marginless last-tag"
                  >Mobile</span
                >
                developer
              </div>
            </div>
          </div>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item v-for="(i, index) of items" :key="index">
          {{ i.title }}
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content">
      <div id="app">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: this.$t('home'),
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: this.$t('achievements'),
          icon: 'certificate',
          to: { name: 'achievements' }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.title {
  margin-bottom: 5px !important;
}

.last-tag {
  margin-right: 0.5rem !important;
}

.tag-text {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.6 !important;
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
      "about": "About this site",
      "initials": "Nickolay Trukhin"
    },
    "ru": {
      "hackathons": "Хакатоны",
      "achievements": "Достижения",
      "projects": "Проекты",
      "books": "Книги",
      "events": "Мероприятия",
      "music": "Музыка",
      "feedback": "Обратная связь",
      "about": "О сайте",
      "initials": "Николай Трухин"
    }
  }
</i18n>
