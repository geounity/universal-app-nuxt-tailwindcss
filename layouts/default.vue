<template lang="pug">
  #app
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

export default {
  name: 'Default',
  components: { Footer, Header, BottomNav },
  data() {
    return {}
  }
}
</script>
