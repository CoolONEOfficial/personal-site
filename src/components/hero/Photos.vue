<template>
  <div>
    <client-only placeholder="Loading...">
      <carousel
        class="show-overflow"
        :perPageCustom="[[1024, 3]]"
        :scroll-per-page="true"
        :pagination-enabled="false"
      >
        <slide v-for="(i, index) of pageItem.images" :key="index">
          <img class="item-image" :src="i.original" />
        </slide>
      </carousel>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Prop } from '~/node_modules/nuxt-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ required: true })
  pageItem
}
</script>
