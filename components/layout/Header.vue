<template lang="pug">
  div(class="pt-12")
    nav.fixed.top-0.w-full.flex.items-center.justify-between.bg-purple-500.p-2(class="sm:p-5")
      div.flex-items-center.flex-shrink-0.text-white.nr-6
        nuxt-link(to="/"): span.font-semibold.text-xl.tracking-tight Geounity
      div.flex(class="md:items-center md:w-auto")
        div.hidden(class="md:flex md:flex-grow").font-bold
          nuxt-link(to="/statics" class="block mt-4 md:inline-block md:mt-0 md:text-white hover:text-white mr-4") Estadísticas
          nuxt-link(to="/debates" class="block mt-4 md:inline-block md:mt-0 md:text-white hover:text-white mr-4") Debates
          nuxt-link(to="/aims" class="block mt-4 md:inline-block md:mt-0 md:text-white hover:text-white mr-4") Propuestas
          nuxt-link(to="/communities" class="block mt-4 md:inline-block md:mt-0 md:text-white hover:text-white mr-4") Comunidades
        div(v-if="auth").inline-block.relative
          select(@change="logout").block.bg-transparent
            option(value="1") {{ username }}
            option(value="2") Cerrar sesión
        div(v-else)
          nuxt-link(to="/signin" class="inline-block text-sm px-2 sm: py-2 ml-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white md:mt-0") Iniciar sesión
          nuxt-link(to="/signup" class="inline-block text-sm px-2 sm: py-2 ml-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white md:mt-0") Registrarse
</template>

<script>
import Cookie from 'js-cookie'
import { mapGetters } from 'vuex'
import { auth } from '~/plugins/firebase'

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      auth: 'users/auth',
      username: 'users/username'
    })
  },
  beforeMount() {
    const self = this
    auth.onAuthStateChanged(function(user) {
      if (user) {
        const newUser = {
          username: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          uid: user.uid
        }
        self.$store.commit('users/SET_USER', newUser)
      }
    })
  },
  methods: {
    async logout(value) {
      auth.signOut()
      await Cookie.remove('access_token')
      location.href = '/'
    }
  }
}
</script>
