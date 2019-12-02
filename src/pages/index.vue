<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Free" icon="github-circle">
        Open source on
        <a href="https://github.com/buefy/buefy">
          GitHub
        </a>
      </card>

      <card title="Responsive" icon="cellphone-link">
        <b class="has-text-grey">
          Every
        </b>
        component is responsive
      </card>

      <card title="Modern" icon="alert-decagram">
        Built with
        <a href="https://vuejs.org/">
          Vue.js
        </a>
        and
        <a href="http://bulma.io/">
          Bulma
        </a>
      </card>

      <card title="Lightweight" icon="arrange-bring-to-front">
        No other internal dependency
      </card>
    </div>
    <img :src="imageSrc" alt="image from storage" />
    {{ $t('welcome') }}
    {{ getCountDocument.count }}
    <!--    <div class="links">-->
    <!--      <div class="button&#45;&#45;green" @click="changeCount(-1)">-1</div>-->
    <!--      <div class="button&#45;&#45;green" @click="changeCount(1)">+1</div>-->
    <!--    </div>-->
  </section>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator'
import Card from '~/components/Card.vue'

@Component({
  components: { Card }
})
export default class extends Vue {
  @Getter
  getCountDocument

  @Action
  bindFirestoreRef

  async mounted() {
    console.log('mounted: bindFirestoreRef')
    try {
      await this.bindFirestoreRef()
    } catch (e) {
      console.error(e)
    }
  }

  async asyncData(ctx) {
    return {
      imageSrc: await ctx.app.$fireStorage
        .ref()
        .child('2019-11-29 21.23.52.jpg')
        .getDownloadURL()
    }
  }
}
</script>

<i18n>
  {
    "en": {
      "welcome": "Localized welcome!"
    },
    "ru": {
      "welcome": "Локализированный текст!"
    }
  }
</i18n>
