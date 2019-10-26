<template lang="pug">
  .h-screen
    Breadcrumbs
    div(v-if="isAuth").text-center
      div(v-if="isVerified")
        nuxt-link(to="/create/poll" tag="button" class="hover:bg-purple-600").bg-purple-500.text-white.font-bold.mt-5.py-2.px-4.rounded.w-64 Crear una encuesta
      div(v-else)
        div(role="alert").bg-yellow-200.border-l-4.border-yellow-600.text-left.text-yellow-900.p-4.mx-4
          p.font-bold Debemos verificar su correo
          p Le hemos enviado un correo de confirmación
          button(type="button" @click="resend") Enviar de nuevo
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
import Breadcrumbs from '~/components/utils/Breadcrumbs'
import { auth } from '~/services/firebase'
export default {
  name: 'Statics',
  components: { Breadcrumbs },
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
  },
  methods: {
    resend() {
      auth.currentUser.sendEmailVerification()
    }
  }
}
</script>
