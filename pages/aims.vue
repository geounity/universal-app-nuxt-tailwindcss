<template lang="pug">
  .h-screen
    Breadcrumbs
    .container.flex.flex-col
      h1.text-2xl No hay propuestas en esta comunidad
      div(v-if="!isAuth")
        h2.text-lg Para proponer una idea debes iniciar sesión
        .flex
          nuxt-link(to="/auth/signin" tag="button" class="hover:border-transparent hover:bg-gray-500").border.border-gray-400.rounded.leading-none.font-semibold.text-teal-600.bg-gray-300.mr-2.mt-5.py-2.px-4.w-full Iniciar sesión
          nuxt-link(to="/auth/signup" tag="button" class="bg-teal-500 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-teal-600").ml-2.mt-5.py-2.px-4.w-full Registrarse
      div(v-else)
        nuxt-link(to="/create/aim" tag="button").mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Proponer una solución
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumbs from '~/components/utils/Breadcrumbs'
export default {
  name: 'AimPage',
  components: { Breadcrumbs },
  computed: {
    ...mapGetters({
      isAuth: 'users/isAuth'
    })
  }
}
</script>
