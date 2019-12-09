<template>
  <section>
    <!--    <div class="columns is-mobile">-->
    <!--      <card title="Free" icon="github-circle">-->
    <!--        Open source on-->
    <!--        <a href="https://github.com/buefy/buefy">-->
    <!--          GitHub-->
    <!--        </a>-->
    <!--      </card>-->

    <!--      <card title="Responsive" icon="cellphone-link">-->
    <!--        <b class="has-text-grey">-->
    <!--          Every-->
    <!--        </b>-->
    <!--        component is responsive-->
    <!--      </card>-->

    <!--      <card title="Modern" icon="alert-decagram">-->
    <!--        Built with-->
    <!--        <a href="https://vuejs.org/">-->
    <!--          Vue.js-->
    <!--        </a>-->
    <!--        and-->
    <!--        <a href="http://bulma.io/">-->
    <!--          Bulma-->
    <!--        </a>-->
    <!--      </card>-->

    <!--      <card title="Lightweight" icon="arrange-bring-to-front">-->
    <!--        No other internal dependency-->
    <!--      </card>-->
    <!--    </div>-->
    <!--    <img :src="imageSrc" alt="image from storage" />-->

    {{ $t('welcome') }}
    <Timeline v-model="getTimelineItems" />
    {{ getTimelineItems }}
  </section>
</template>

<script lang="ts">
import {
  Action,
  Component,
  Getter,
  namespace,
  Vue
} from 'nuxt-property-decorator'
import Card from '~/components/Card.vue'
import Timeline from '~/components/Timeline.vue'

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

  // list = [
  //   'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1600&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjEyMDd9',
  //   'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1600&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjEyMDd9',
  //   'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1600&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjEyMDd9',
  //   'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1600&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjEyMDd9',
  //   'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1600&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjEyMDd9',
  //   'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1600&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjEyMDd9',
  //   'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1600&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjEyMDd9',
  // ]

  async fetch({ store, app }) {
    try {
      await store.dispatch('timeline/loadTimelineItems')

      //const items = store.getters.getTimelineItems
      //
      // for(const mItem of items) {
      //   if(Boolean(mItem.imagesPath)) {
      //     const ref = app.$fireStorage.ref().child(mItem.imagesPath);
      //     mItem.images = (await ref.list()).items.map(async (i) => await i.getDownloadURL())
      //     // console.log('images result: ', mItem.images)
      //     // console.log('ref result: ', ref)
      //     // console.log('path: ', mItem.imagesPath)
      //     // for(const mRef of (await ref.list()).items) {
      //     //   console.log('mref..')
      //     //   mItem.images = await mRef.getDownloadURL()
      //     // }
      //   }
      // }
    } catch (e) {
      console.error('error! ', e)
    }
  }

  // async asyncData({ app, store }) {
  //
  //
  //   return {
  //     test: await app.$fireStorage
  //       .ref()
  //       .child('2019-11-29 21.23.52.jpg')
  //       .getDownloadURL()
  //   }
  // }

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
