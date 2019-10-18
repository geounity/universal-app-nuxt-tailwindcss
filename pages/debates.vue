<template lang="pug">
  .h-screen
    Breadcrumbs
    .container.flex.flex-col
      div(v-if="!debates || debates.length === 0")
        h1.text-2xl.text-center No hay debates en esta comunidad
        div(v-if="!isAuth")
          h2.text-md.text-center Para abrir un debate debes iniciar sesión
          .flex
            nuxt-link(to="/auth/signin" tag="button" class="hover:border-transparent hover:bg-gray-500").border.border-gray-400.rounded.leading-none.font-semibold.text-teal-600.bg-gray-300.mr-2.mt-5.py-2.px-4.w-full Iniciar sesión
            nuxt-link(to="/auth/signup" tag="button" class="bg-teal-500 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-teal-600").ml-2.mt-5.py-2.px-4.w-full Registrarse
        div(v-else)
          nuxt-link(to="/create/debate" tag="button").mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Abrir un debate
      main(v-else)
        CardDebate(
          v-for="debate in debates"
          :key="debate.id"
          :id="debate.id"
          :public="debate.public"
          :title="debate.title"
          :description="debate.description"
          :author="debate.author"
          :date="debate.createdAt"
          :type="debate.type"
          :charmin="debate.char_min"
          :charmax="debate.char_max"
          :community="debate.geopoliticUuid"
        )
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Breadcrumbs from '~/components/utils/Breadcrumbs'
import CardDebate from '~/components/cards/debate'
export default {
  name: 'DebatesPage',
  components: { CardDebate, Breadcrumbs },
  computed: {
    ...mapGetters({
      isAuth: 'users/isAuth'
    }),
    ...mapState({
      debates: (state) => state.debate.debates
    })
  },
  mounted() {
    this.$store.dispatch('debate/get_debates')
  }
}
</script>
