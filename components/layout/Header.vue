<template lang="pug">
  nav.flex.items-center.justify-between.bg-purple-500.p-2(class="sm:p-5")
    div.flex-items-center.flex-shrink-0.text-white.nr-6
      nuxt-link(to="/"): span.font-semibold.text-xl.tracking-tight Geounity
    div.flex(class="md:items-center md:w-auto")
      div.hidden(class="md:flex md:flex-grow")
        nuxt-link(to="/statics" class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4") Estadísticas
        nuxt-link(to="/debates" class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4") Debates
        nuxt-link(to="/aims" class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4") Propuestas
        nuxt-link(to="/communities" class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4") Comunidades
      div(v-if="auth").inline-block.relative.w-64
        select.block.appearance-none.w-full.bg-white.border.border-gray-400
          option {{ username }}
          option Cerrar sesión
      div(v-else)
        nuxt-link(to="login" class="inline-block text-sm px-2 sm: py-2 ml-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white md:mt-0") Iniciar sesión
        nuxt-link(to="signup" class="inline-block text-sm px-2 sm: py-2 ml-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white md:mt-0") Registrarse
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      auth: 'users/auth',
      username: 'users/username'
    })
  }
}
</script>
