<template lang="pug">
  .h-screen.mt-8
    div(v-if="isAuth").text-center
      div(v-if="!isVerified")
        AlertVerifyEmail
    Breadcrumbs
    div(v-if="isAuth && isVerified").text-center
      nuxt-link(to="/create/debate" tag="button" class="hover:bg-teal-600").border-b-2.border-teal-600.bg-teal-500.text-white.font-bold.mt-5.py-2.px-4.rounded.w-64 Abrir un debate
    div(v-if="!debates || debates.length === 0").mt-10
      h1.text-2xl.text-center.px-2 No hay debates en esta comunidad
    div(v-if="!isAuth").my-10
      h2.text-lg.text-center Para abrir un debate debes iniciar sesión
      .flex.px-6.max-w-sm.mx-auto
        nuxt-link(to="/auth/signin" tag="button" class="hover:border-transparent hover:bg-gray-500").border.border-gray-400.rounded.leading-none.font-semibold.text-teal-600.bg-gray-300.mr-2.mt-5.py-2.px-4.w-full Iniciar sesión
        nuxt-link(to="/auth/signup" tag="button" class="bg-teal-500 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-teal-600").ml-2.mt-5.py-2.px-4.w-full Registrarse
    .container(v-if="errorMsg")
      h3.text-lg {{ errorMsg }}
    main
      CardDebate(
        v-for="debate in debates"
        :key="debate.id"
        :id="debate.id"
        :public="debate.public"
        :title="debate.title"
        :description="debate.description"
        :images="debate.images"
        :author="debate.author"
        :date="debate.createdAt"
        :type="debate.type"
        :charmin="debate.char_min"
        :charmax="debate.char_max"
        :community="debate.inGeopolitic.name"
      )    
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import AlertVerifyEmail from '~/components/alerts/VerifyEmail'
import Breadcrumbs from '~/components/utils/Breadcrumbs'
import CardDebate from '~/components/cards/debate'
export default {
  name: 'DebatesPage',
  components: { AlertVerifyEmail, Breadcrumbs, CardDebate },
  data() {
    return {
      errorMsg: ''
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'users/isAuth',
      isVerified: 'users/isVerified'
    }),
    ...mapState({
      debates: (state) => state.debates.debates
    })
  },
  mounted() {
    this.$store.dispatch('debates/get_debates').catch((error) => {
      this.errorMsg = 'Ups! No podemos comunicarnos el servidor. ' + error
    })
  },
  methods: {
    resend() {
      this.$store.dispatch('users/resend_email_verification')
    }
  }
}
</script>
