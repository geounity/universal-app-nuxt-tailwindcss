<template lang="pug">
  .container
    .w-full.max-w-xs
      form.bg-white.shadow-md.rounded.px-8.pt-6.pb-8.mb-4
        .mb-4
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='email')
            | Correo electrónico
          input#email.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.email" class='focus:outline-none focus:shadow-outline' type='text' placeholder='email@example.com')
          p.text-red-500.text-xs.italic(v-if="error") {{ errorMsg }}
        .mb-6
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='password')
            | Contraseña
          input#password.shadow.appearance-none.border.border-red-500.rounded.w-full.py-2.px-3.text-gray-700.mb-3.leading-tight(v-model="form.password" class='focus:outline-none focus:shadow-outline' type='password' placeholder='******************')
          p.text-red-500.text-xs.italic Please choose a password.
        .flex.items-center.justify-between
          button.bg-blue-500.text-white.font-bold.py-2.px-4.rounded(@click="login" class='hover:bg-blue-700 focus:outline-none focus:shadow-outline' type='button')
            | Sign In
          a.inline-block.align-baseline.font-bold.text-sm.text-blue-500(class='hover:text-blue-800' href='#')
            | Forgot Password?
      p.text-center.text-gray-500.text-xs
        | &copy;2019 Geounity Organization. All rights reserved.
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    error: false,
    errorMsg: ''
  }),
  methods: {
    login() {
      this.$store.dispatch('users/login', this.form).catch((error) => {
        this.error = true
        this.errorMsg = error.code
        setTimeout(() => {
          this.error = false
        }, 5000)
      })
      this.$router.push('/')
    }
  }
}
</script>
