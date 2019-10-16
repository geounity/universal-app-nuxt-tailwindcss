<template lang="pug">
  .container.flex.flex-col
    div(v-if="!debates || debates.length === 0")
      h1.text-2xl No hay debates en esta comunidad
      div(v-if="!isAuth")
        h2.text-lg Para abrir un debate debes iniciar sesión
        .flex
          nuxt-link(to="/auth/signin" tag="button").mr-2.mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Iniciar sesión
          nuxt-link(to="/auth/signup" tag="button").ml-2.mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Registrarse
      div(v-else)
        nuxt-link(to="/create/debate" tag="button").mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Abrir un debate
    main(v-else)
      CardDebate(
        v-for="debate in debates"
        :key="debate.id"
        :public="debate.public"
        :title="debate.title"
        :description="debate.description"
        :author="debate.author"
        :date="debate.date"
        :type="debate.type"
        :charmin="debate.charmin"
        :charmax="debate.charmax"
        :community="debate.community"
      )
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import CardDebate from '~/components/cards/debate'
export default {
  name: 'Debates',
  components: { CardDebate },
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
