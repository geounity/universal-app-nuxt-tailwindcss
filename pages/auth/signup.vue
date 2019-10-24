<template lang="pug">
  .bg-gray-500.pt-5
    FormRegister
</template>

<script>
import FormRegister from '~/components/forms/Register'
export default {
  name: 'SignUp',
  middleware: ['authenticated'],
  components: { FormRegister }
}
</script>
