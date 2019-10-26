<template lang="pug">
  div
    h1.mt-10.text-2xl.font-bold Debates en {{ place }}
    h2.mt-5.text-xl.font-bold {{ title }}
</template>

<script>
export default {
  data() {
    return {
      place: this.$route.params.country,
      title: this.$route.params.title
    }
  },
  created() {
    console.log(this.$route.params)
  }
}
</script>
