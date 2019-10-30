<template lang="pug">
  #pageIndex
    section(v-if="!isAuth" class="md:flex-row md:justify-around md:items-center md:text-left").presentation.w-full.py-5.flex.flex-col.items-center
      div.text-white.text-center.mx-auto
        h1(class="md:text-4xl lg:text-5xl xl:text-6xl").text-3xl.font-black.my-2 Mediación Digital
        ul
          li: h2(class="md:text-lg lg:text-xl xl:text-2xl").text-md.font-hairline.pb-2 Debates entre comunidades y personas.
          li: h2(class="md:text-lg lg:text-xl xl:text-2xl").text-md.font-hairline.pb-2 Opiniones entre naciones, provincias y municipios.
          li: h2(class="md:text-lg lg:text-xl xl:text-2xl").text-md.font-hairline.pb-2 Puntos de vistas entre naciones, provincias y municipios.
          li
            h2(class="md:text-lg lg:text-xl xl:text-2xl").text-md.font-hairline.pb-2
            i Comparte tu perspectiva única con todos.
        figure.flex.justify-between
          img(src="/debate.svg" alt="debate" class="lg:h-40").h-20.mt-10.mx-auto
          img(src="/analyze.svg" alt="analyze" class="lg:h-40").h-20.mt-10.mx-auto
      FormRegister
    .div(v-else class="md:flex-row")
      Breadcrumbs
      section.mt-10
        div(v-if="isAuth").text-center
          div(v-if="isVerified")
            img(src="/world.svg" alt="mapamundi").h-64.mx-auto
            h3.text-5xl.font-bold Bienvenido
            nuxt-link(to="/create/debate" tag="button" class="hover:bg-purple-600").bg-purple-500.text-white.font-bold.mt-5.py-2.px-4.rounded.w-64 Abrir un debate
          div(v-else)
            div(role="alert").bg-yellow-200.border-l-4.border-yellow-600.text-left.text-yellow-900.p-4.mx-4
              p.font-bold Debemos verificar su correo
              p Le hemos enviado un correo de confirmación
              button(type="button" @click="resend") Enviar de nuevo
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumbs from '~/components/utils/Breadcrumbs'
import FormRegister from '~/components/forms/Register'
export default {
  name: 'Index',
  components: { FormRegister, Breadcrumbs },
  data: () => ({}),
  computed: {
    ...mapGetters({
      isAuth: 'users/isAuth',
      isVerified: 'users/isVerified'
    })
  },
  methods: {
    resend() {
      this.$store.dispatch('users/resend_email_verification')
    }
  }
}
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.presentation {
  /* heropatterns */
  background-color: #55525a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%239C92AC' fill-opacity='0.15' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
