<template lang="pug">
  div(class="pt-12")
    nav(class="sm:p-4").fixed.top-0.w-full.flex.items-center.justify-between.bg-purple-500.text-white.p-2
      nuxt-link(to="/"): span.font-semibold.text-xl.tracking-tight Geounity
      div(class="md:items-center md:w-auto").flex
        div(class="md:flex").font-bold.hidden
          nuxt-link(to="/statics" class="block md:text-white hover:bg-purple-600 px-2 rounded") Estadísticas
          nuxt-link(to="/debates" class="block md:text-white hover:bg-purple-600 px-2 rounded") Debates
          nuxt-link(to="/aims" class="block md:text-white hover:bg-purple-600 px-2 rounded") Propuestas
          nuxt-link(to="/communities" class="block md:text-white hover:bg-purple-600 px-2 rounded") Comunidades
        
        .relative.inline-block.text-gray-700(v-if="isAuth")
          button(:class="{'bg-gray-300': menuIsOpen }" @click="menuIsOpen=!menuIsOpen" class="hover:bg-gray-700 focus:outline-none focus:bg-gray-700").inline-flex.items-center.ml-2.pl-6.pr-2.py-2.font-semibold.text-white.bg-gray-800.rounded-lg
            | Ego
            <svg class="ml-2 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/>
            </svg>
          transition(
            enter-class="opacity-0 scale-90"
            enter-active-class="ease-out transition-fastest"
            enter-to-class="opacity-100 scale-100"
            leave-class="opacity-100 scale-100"
            leave-active-class="ease-in transition-fatest"
            leave-to-class="opacity-0 scale-90"
          )
            div(v-if="menuIsOpen").mt-2.absolute.right-0.origin-top-right
              .w-64.text-left.bg-white.rounded-lg.shadow-lg
                nuxt-link(to="/user/profile").flex.items-center.px-6.py-4
                  img(:src="avatar?avatar:'/sinfoto.png'" alt="Mi foto de perfil").h-10.w-10.rounded-full.flex-no-shrink
                  .ml-4
                    p.font-semibold.text-gray-900.leading-none {{ username }}
                    p: nuxt-link(to="/user/profile" class="hover:underline").text-sm.text-gray-600.leading-none Ver perfil
                .border-t-2.border-gray-200.py-1
                  nuxt-link(to="/" class="hover:bg-gray-200").block.px-6.py-3.leading-tight Mis encuestas
                  nuxt-link(to="/" class="hover:bg-gray-200").block.px-6.py-3.leading-tight Mis debates
                  nuxt-link(to="/" class="hover:bg-gray-200").block.px-6.py-3.leading-tight Mis Propuestas
                .border-t-2.border-gray-200.py-1
                  a(href="#" @click="logout" class="block w-full px-6 py-3 text-left leading-tight hover:bg-gray-200") Cerrar sesión
        div(v-else).flex.text-sm
          nuxt-link(to="/auth/signin" class="border border-gray-400 bg-gray-200 p-2 ml-2 font-semibold leading-none rounded text-sm text-teal-500 md:text-sm lg:px-5 lg:text-lg hover:border-transparent hover:bg-gray-400") Iniciar sesión
          nuxt-link(to="/auth/signup" class="border border-teal-600 bg-teal-500 p-2 ml-2 font-semibold leading-none rounded text-sm text-gray-100 md:text-sm lg:px-5 lg:text-lg hover:border-transparent hover:bg-teal-600") Registrarse
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data: () => ({
    menuIsOpen: false
  }),
  computed: {
    ...mapGetters({
      avatar: 'users/avatar',
      isAuth: 'users/isAuth',
      username: 'users/username'
    })
  },
  beforeMount() {
    this.$store.dispatch('users/verifyAuth')
  },
  methods: {
    logout() {
      this.$store.dispatch('users/logout')
    }
  }
}
</script>
