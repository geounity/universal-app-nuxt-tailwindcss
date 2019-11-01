<template lang="pug">
  h1.mt-10 {{ slug }}
</template>

<script>
export default {
  data() {
    return {
      slug: this.$route.params.country
    }
  }
}
</script>
