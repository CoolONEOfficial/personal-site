<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title error-code">
          {{ statusCode }}
        </h1>
        <h2 class="subtitle">
          {{ $t('description') }}
        </h2>
        <nuxt-link to="/">
          <b-button>
            {{ $t('homepage') }}
          </b-button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
  layout: 'default'
})
export default class errorDialog extends Vue {
  @Prop()
  error

  get statusCode() {
    return (this.error && this.error.statusCode) || 500
  }
}
</script>

<style scoped lang="scss">
.error-code {
  font-size: 30vmin;
}
</style>

<i18n>
  {
    "en": {
      "description": "Oops! Something went wrong...",
      "homepage": "Back to homepage"
    },
    "ru": {
      "description": "Опаньки! Что-то пошло не так...",
      "homepage": "Вернуться на главную"
    }
  }
</i18n>
