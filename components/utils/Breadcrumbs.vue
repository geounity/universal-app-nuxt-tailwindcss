<template lang="pug">
  nav.bg-grey-light.rounded.font-sans.text-center.mt-3.w-full(class="sm:p-3 sm:m-4")
    h3.text-xl.text-center.text-sm.mt-6 Ahora estas en :
    ol.list-reset.text-grey-dark.text-md(class="sm:flex sm:text-md")
      li(v-for="(geopolitic, i) in geopolitics" :key="i")
        a.text-blue-700.text-xl(href='#'): span {{ geopolitic.name }}
        span.invisible(class="sm:visible sm:mx-2") /
      li(v-if="!isPageCommunities")
        nuxt-link(tag="button" to="/communities" type="button" class="hover:bg-blue-600 sm:mt-0").bg-blue-500.text-white.px-4.py-2.rounded.text-sm.mt-3 Cambiar ubiación
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Breadcrumbs',
  props: {
    isPageCommunities: { type: Boolean, required: false, default: false }
  },
  computed: {
    ...mapGetters({
      geopolitics: 'communities/geopoliticsBreadcrumbs'
    })
  }
}
</script>
