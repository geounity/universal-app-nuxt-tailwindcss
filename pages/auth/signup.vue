<template lang="pug">
  .bg-gray-500.pt-5
    div(class="md:mt-24")
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
