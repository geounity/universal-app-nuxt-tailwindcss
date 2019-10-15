<template lang="pug">
  .container.bg-gray-500
    FormRegister
</template>

<script>
import FormRegister from '~/components/forms/Register'
export default {
  name: 'SignUp',
  components: { FormRegister }
}
</script>

<style>
.container {
  min-width: 100vw;
}
</style>
