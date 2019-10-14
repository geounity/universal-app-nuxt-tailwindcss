<template lang="pug">
  .container.flex.flex-col
    h1.text-2xl No hay datos sobre esta comunidad
    div(v-if="!isAuth")
      h2.text-lg Para crear una encuesta debes iniciar sesión
      .flex
        nuxt-link(to="/auth/signin" tag="button").mr-2.mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Iniciar sesión
        nuxt-link(to="/auth/signup" tag="button").ml-2.mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Registrarse
    div(v-else)
      nuxt-link(to="/create/poll" tag="button").mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Crear una encuesta
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Statics',
  computed: {
    ...mapGetters({
      isAuth: 'users/isAuth'
    })
  }
}
</script>
