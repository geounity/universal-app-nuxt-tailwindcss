<template lang="pug">
  div(class="pt-12")
    nav(class="sm:p-4").fixed.top-0.w-full.flex.justify-between.bg-purple-500.text-white.p-2
      nuxt-link(to="/"): span.font-semibold.text-xl.tracking-tight Geounity
      div(class="md:items-center md:w-auto").flex
        div(class="md:flex").font-bold.hidden
          nuxt-link(to="/statics" class="block md:text-white mr-4") Estadísticas
          nuxt-link(to="/debates" class="block md:text-white mr-4") Debates
          nuxt-link(to="/aims" class="block md:text-white mr-4") Propuestas
          nuxt-link(to="/communities" class="block md:text-white mr-4") Comunidades
        div(v-if="isAuth").inline-block.relative
          button(@click="showMenuUser=!showMenuUser" class="focus:outline-none focus:border-white").block.h-8.w-8.rounded-full.overflow-hidden.border-2.border-gray-500
            img(:src="avatar?avatar:'/sinfoto.png'" alt="Mi foto de perfil").h-full.w-full.object-cover
          div(v-show="showMenuUser").mt-2.py-2.w-48.bg-white.rounded-lg.shadow-xl.absolute.right-0
            nuxt-link(to="/user/profile" class="hover:bg-indigo-500 hover:text-white").block.px-4.py-2.text-gray-800 {{ username }}
            a(href="#" @click="logout" class="hover:bg-indigo-500 hover:text-white").block.px-4.py-2.text-gray-800 Cerrar sesión
        div(v-else).flex.text-sm
          nuxt-link(to="/auth/signin" class="p-2 ml-2 bg-white text-teal-500 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100") Iniciar sesión
          nuxt-link(to="/auth/signup" class="p-2 ml-2 bg-teal-500 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-teal-600") Registrarse
</template>

<script>
import Cookie from 'js-cookie'
import { mapGetters } from 'vuex'
import { auth } from '~/plugins/firebase'

export default {
  name: 'Header',
  data: () => ({
    showMenuUser: false
  }),
  computed: {
    ...mapGetters({
      avatar: 'users/avatar',
      isAuth: 'users/isAuth',
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
