<template lang="pug">
  .container.bg-gray-500
    .w-full.max-w-md
      form.bg-white.shadow-md.rounded.px-6.pt-6.pb-8.mb-4
        h2.text-2xl.font-bold.text-center Inicia sesión
        .mb-4
          p.text-red-500.text-xs.italic(v-if="error")
            b {{ errorMsg }}
        .mb-4
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='email')
            | Correo electrónico
          input#email.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.email" class='focus:outline-none focus:shadow-outline' type='text' placeholder='email@example.com')
        .mb-6
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='password')
            | Contraseña
          input#password.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.mb-3.leading-tight(v-model="form.password" class='focus:outline-none focus:shadow-outline' type='password' placeholder='******************')
        .mb-2
          button(@click="login" class='hover:bg-teal-600 focus:outline-none focus:shadow-outline' type='button').py-2.px-4.bg-teal-500.text-gray-100.font-bold.border-teal-600.rounded.w-full
            | Iniciar sesión
        nuxt-link.inline-block.align-baseline.font-bold.text-sm.text-purple-500.w-full(to="/login" class='hover:text-purple-800' href='#')
          | ¿Olvidaste la contraseña?
            
      p.text-center.text-gray-500.text-xs
        | &copy;2019 Geounity Organization. All rights reserved.
</template>

<script>
export default {
  name: 'SignIn',
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    error: false,
    errorCode: '',
    errorMsg: ''
  }),
  methods: {
    login(e) {
      e.preventDefault()
      this.$store
        .dispatch('users/login', this.form)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.error = true
          this.errorCode = error.code
          this.errorMsg = error.message
          setTimeout(() => {
            this.error = false
          }, 10000)
        })
    }
  }
}
</script>

<style>
.container {
  min-width: 100vw;
}
</style>
