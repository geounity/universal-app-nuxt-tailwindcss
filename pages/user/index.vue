<template lang="pug">
  .container
    h1 Redirigiendo
</template>

<<script>
export default {
  name: 'UserIndex',
  beforeMount() {
    this.$router.push('/user/profile')
  }
}
</script>
