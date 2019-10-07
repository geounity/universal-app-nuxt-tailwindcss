<template lang="pug">
  div
    Header
    nuxt
    Footer
</template>

<script>
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default {
  name: 'Default',
  components: { Footer, Header },
  data() {
    return {}
  }
}
</script>
