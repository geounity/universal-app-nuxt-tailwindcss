<template lang="pug">
  div
    h1.mt-10.text-2xl.font-bold Debates en {{ country }} - {{ state }}
    h2.mt-5.text-xl.font-bold {{ title }}
</template>

<script>
export default {
  data() {
    return {
      country: this.$route.params.country,
      state: this.$route.params.state,
      title: this.$route.params.title
    }
  }
}
</script>
