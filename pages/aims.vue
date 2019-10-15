<template lang="pug">
  .container.flex.flex-col
    h1.text-2xl No hay propuestas en esta comunidad
    div(v-if="!isAuth")
      h2.text-lg Para proponer una idea debes iniciar sesión
      .flex
        nuxt-link(to="/auth/signin" tag="button").mr-2.mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Iniciar sesión
        nuxt-link(to="/auth/signup" tag="button").ml-2.mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Registrarse
    div(v-else)
      nuxt-link(to="/create/aim" tag="button").mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Proponer una solución
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Debates',
  computed: {
    ...mapGetters({
      isAuth: 'users/isAuth'
    })
  }
}
</script>
