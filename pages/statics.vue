<template lang="pug">
  .h-screen.mt-8
    div(v-if="isAuth")
      div(v-if="!isVerified")
        AlertVerifyEmail
    Breadcrumbs
    div(v-if="isAuth && isVerified").text-center
      nuxt-link(to="/create/poll" tag="button" class="hover:bg-purple-600").bg-purple-500.text-white.font-bold.mt-5.py-2.px-4.rounded.w-64 Crear una encuesta
    div(v-if="!statics || statics.length === 0").mt-10
      h1.text-2xl.text-center.px-2 No hay datos sobre esta comunidad
    div(v-if="!isAuth").my-10
      h2.text-lg.text-center Para crear una encuesta debes iniciar sesión
      .flex.px-6.max-w-sm.mx-auto
        nuxt-link(to="/auth/signin" tag="button" class="hover:border-transparent hover:bg-gray-500").border.border-gray-400.rounded.leading-none.font-semibold.text-teal-600.bg-gray-300.mr-2.mt-5.py-2.px-4.w-full Iniciar sesión
        nuxt-link(to="/auth/signup" tag="button" class="bg-teal-500 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-teal-600").ml-2.mt-5.py-2.px-4.w-full Registrarse
</template>

<script>
import { mapGetters } from 'vuex'
import AlertVerifyEmail from '~/components/alerts/VerifyEmail'
import Breadcrumbs from '~/components/utils/Breadcrumbs'
export default {
  name: 'Statics',
  components: { AlertVerifyEmail, Breadcrumbs },
  data() {
    return {
      statics: []
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'users/isAuth',
      isVerified: 'users/isVerified'
    })
  }
}
</script>
