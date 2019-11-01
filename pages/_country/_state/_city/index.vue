<template lang="pug">
  h1.text-4xl.font-bold.mt-10 {{ country }} - {{ state }} - {{ city }}
</template>

<script>
export default {
  data() {
    return {
      country: this.$route.params.country,
      state: this.$route.params.state,
      city: this.$route.params.city
    }
  }
}
</script>
