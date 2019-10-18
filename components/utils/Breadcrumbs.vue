<template lang="pug">
  nav.bg-grey-light.rounded.font-sans.text-center.mt-3.w-full(class="sm:p-3 sm:m-4")
    ol.list-reset.text-grey-dark.text-sm(class="sm:flex sm:text-md")
      li(v-for="(geopolitic, i) in geopolitics" :key="i")
        a.text-blue-700(href='#') {{ geopolitic.name }}
        span.invisible(class="sm:visible sm:mx-2") /
      li
        nuxt-link(tag="button" to="/communities" type="button" class="hover:bg-blue-600").bg-blue-500.text-white.px-4.px-2.rounded.text-sm Cambiar ubiación
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Breadcrumbs',
  computed: {
    ...mapGetters({
      geopolitics: 'communities/geopoliticsBreadcrumbs'
    })
  }
}
</script>
