<template lang="pug">
  .container
    .w-full.max-w-xs
      form.bg-white.shadow-md.rounded.px-8.pt-6.pb-8.mb-4
        .mb-4
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='username')
            | Nombre de usuario
          input#username.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.username" class='focus:outline-none focus:shadow-outline' type='text' placeholder='Username' maxlength="15")
        .mb-4
          label.block.text-gray-700.text-sm.font-bold.mb-2(v-model="form.email" for='email')
            | Correo electrónico
          input#email.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.password" class='focus:outline-none focus:shadow-outline' type='text' placeholder='email@example.com')
        .mb-4
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='password')
            | Contraseña
          input#password.shadow.appearance-none.border.border.rounded.w-full.py-2.px-3.text-gray-700.mb-3.leading-tight(v-model="form.passwordconf" class='focus:outline-none focus:shadow-outline' type='password' placeholder='******************')
        .mb-6
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='passwordconf')
            | Confirmar contraseña
          input#passwordconf.shadow.appearance-none.border.border-red-500.rounded.w-full.py-2.px-3.text-gray-700.mb-3.leading-tight(class='focus:outline-none focus:shadow-outline' type='password' placeholder='******************')
          p.text-red-500.text-xs.italic Please choose a password.
        .flex.items-center.justify-between
          button.bg-purple-500.text-white.font-bold.py-2.px-4.rounded(@click="register" class='hover:bg-purple-700 focus:outline-none focus:shadow-outline' type='button')
            | Registrarse
          nuxt-link.inline-block.align-baseline.font-bold.text-sm.text-purple-500(to="/login" class='hover:text-purple-800' href='#')
            | Iniciar sesión
      p.text-center.text-gray-500.text-xs
        | &copy;2019 Geounity Organization. All rights reserved.
</template>

<script>
export default {
  name: 'Signup',
  data: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      passwordconf: ''
    }
  }),
  methods: {
    register() {
      this.$store.dispatch('users/register', this.form)
      this.$router.push('/user')
    }
  }
}
</script>
