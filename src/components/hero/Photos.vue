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
          <Picture class="modal-image" :src="i.original" fit="contain" :alt="`Item photo №${index + 1}`" />
        </slide>
      </carousel>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Prop } from '~/node_modules/nuxt-property-decorator'
import Picture from "~/components/Picture.vue";

@Component({
  components: { Picture }
})
export default class extends Vue {
  @Prop({ required: true })
  pageItem
}
</script>
