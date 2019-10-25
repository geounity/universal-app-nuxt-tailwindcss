<template lang="pug">
  nav.font-bold.text-center.text-black.my-3.w-full(class="sm:p-3 sm:m-4" aria-label="Breadcrumb")
    ol.list-none.p-0.inline-flex(class="sm:flex")
      li(v-for="(geopolitic, i) in geopolitics" :key="i").flex.items-center
        a.text-xl(href='#') {{ geopolitic.name }}
        <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
        </svg>
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
