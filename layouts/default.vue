<template lang="pug">
  #app(class="bg-gray-100")
    Header
    main.min-h-screen
      nuxt
    Footer
    BottomNav
</template>

<script>
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BottomNav from '../components/layout/BottomNav'
import { auth } from '~/plugins/firebase'

export default {
  name: 'Default',
  components: { Footer, Header, BottomNav },
  data() {
    return {}
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
