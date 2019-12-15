<template>
  <b-navbar class="header">
    <template slot="brand">
      <b-navbar-item @click="onLogoClicked">
        <img
          src="/favicon.jpg"
          style="border-radius: 50%;"
          alt="Favicon image"
          class="has-margin-right-10"
        />
        <div>
          <h1 class="title is-5">{{ $t('initials') }}</h1>
          <div class="columns is-marginless">
            <b-taglist attached class="is-marginless">
              <b-tag class="hover-light" type="is-dark">Web</b-tag>
              <b-tag class="hover-dark" type="is-primary">Mobile</b-tag>
            </b-taglist>
            <div class="tag-text">
              {{ $t('developer') }}
            </div>
          </div>
        </div>
      </b-navbar-item>
    </template>
    <template slot="start">
      <HeaderItem v-for="(i, index) of items" :key="index" :item="i" />
    </template>

    <template slot="end">
      <HeaderItem v-for="(i, index) of endItems" :key="index" :item="i" />
      <div style="width: 0.75rem" />
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

  onLogoClicked() {
    this.$router.push(this.localePath('index'))
  }
}
</script>

<style lang="scss">
.header {
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
