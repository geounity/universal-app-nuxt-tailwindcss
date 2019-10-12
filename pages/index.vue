<template lang="pug">
  .container.flex.flex-col
    h1.text-4xl.font-black Moderación Digital
    h2.text-base.font-hairline Debates entre comunidades y personas.
    div(v-if="auth")
      nuxt-link(to="/create/debate" tag="button").mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full Abrir un debate
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data: () => ({}),
  computed: {
    ...mapGetters({
      auth: 'users/auth'
    })
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
