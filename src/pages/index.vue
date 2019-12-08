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
<!--    <img :src="imageSrc" alt="image from storage" />-->
    {{ $t('welcome') }}
    <i class="la la-book"></i>
    <Timeline v-model="getTimelineItems" />
  </section>
</template>

<script lang="ts">
  import { Action, Component, Getter, namespace, Vue } from "nuxt-property-decorator";
import Card from '~/components/Card.vue'
  import Timeline from "~/components/Timeline.vue";

const vuexModule = namespace('timeline')

@Component({
  components: { Timeline, Card }
})
export default class extends Vue {
  @vuexModule.Getter
  getTimelineItems

  // @module.Action
  // bindTimelineItems

  // async mounted() {
  //   console.log('mounted: bindFirestoreRef')
  //   try {
  //     await this.bindTimelineItems()
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  async fetch({ store }) {
    try {
      await store.dispatch('timeline/loadTimelineItems')
    } catch (e) {
      console.error(e)
    }
  }

  // async asyncData(ctx) {
  //   console.log('okey letsgo')
  //   return {
  //     imageSrc: await ctx.app.$fireStorage
  //       .ref()
  //       .child('2019-11-29 21.23.52.jpg')
  //       .getDownloadURL()
  //   }
  // }
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
