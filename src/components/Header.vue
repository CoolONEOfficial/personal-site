<template>
  <b-navbar>
    <template slot="brand">
      <nuxt-link :to="localePath('index')">
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
                {{ $t('developer') }}
              </div>
            </div>
          </div>
        </b-navbar-item>
      </nuxt-link>
    </template>
    <template slot="start">
      <HeaderItem v-for="(i, index) of items" :key="index" :item="i" />
    </template>

    <template slot="end">
      <HeaderItem v-for="(i, index) of endItems" :key="index" :item="i" />
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HeaderItem from '~/components/HeaderItem.vue'

@Component({
  components: { HeaderItem }
})
export default class extends Vue {
  items = [
    {
      title: 'achievements',
      icon: 'certificate',
      to: 'achievements'
    },
    {
      title: 'projects',
      icon: 'octocat',
      to: 'projects'
    },
    {
      title: 'books',
      icon: 'book',
      to: 'books'
    },
    {
      title: 'events',
      icon: 'calendar',
      to: 'events'
    },
    {
      title: 'music',
      icon: 'music',
      to: 'music'
    }
  ]

  endItems = [
    {
      title: 'feedback',
      icon: 'comments',
      to: 'feedback'
    },
    {
      title: 'about',
      icon: 'info',
      to: 'about'
    }
  ]
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
  color: $grey !important;
  line-height: 1.6 !important;
}
</style>

<i18n>
  {
    "en": {
      "initials": "Nickolay Trukhin",
      "developer": "developer"
    },
    "ru": {
      "initials": "Николай Трухин",
      "developer": "разработчик"
    }
  }
</i18n>
