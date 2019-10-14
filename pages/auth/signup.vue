<template lang="pug">
  .container
    .w-full.max-w-sm
      form.bg-white.shadow-md.rounded.px-8.pt-6.pb-8.mb-4
        .mb-4
          p.text-red-500.text-xs.italic(v-if="error")
            b {{ errorMsg }}
        .mb-4
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='username')
            | Nombre de usuario
          input#username.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.username" class='focus:outline-none focus:shadow-outline' type='text' placeholder='Username' maxlength="15")
        .mb-4
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='email')
            | Correo electrónico
          input#email.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.email" class='focus:outline-none focus:shadow-outline' type='email' placeholder='email@example.com')
        .mb-4
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='password')
            | Contraseña
          input#password.shadow.appearance-none.border.border.rounded.w-full.py-2.px-3.text-gray-700.mb-3.leading-tight(v-model="form.password" class='focus:outline-none focus:shadow-outline' type='password' placeholder='******************')
        .mb-4
          label.block.text-gray-700.text-sm.font-bold.mb-2(for='passwordconf')
            | Confirmar contraseña
          input#passwordconf.shadow.appearance-none.border.border-red-500.rounded.w-full.py-2.px-3.text-gray-700.mb-3.leading-tight(v-model="form.passwordconf" class='focus:outline-none focus:shadow-outline' type='password' placeholder='******************')
        .mb-6
          div(class="md:w-1/3")
          label(class="block text-gray-500 font-bold")
            input.mr-2.leading-tight(type="checkbox")
            span.text-sm Acepto los terminos y condiciones.
        .mb-2
          button.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-full(@click="register" class='hover:bg-purple-700 focus:outline-none focus:shadow-outline' type='button')
            | Registrarse
        .items-center
          nuxt-link.inline-block.align-baseline.font-bold.text-sm.text-purple-500.w-full(to="/login" class='hover:text-purple-800' href='#')
            | ¿Ya tienes un usuario?
      p.text-center.text-gray-500.text-xs
        | &copy;2019 Geounity Organization. All rights reserved.
</template>

<script>
export default {
  name: 'SignUp',
  data: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      passwordconf: ''
    },
    error: false,
    errorCode: '',
    errorMsg: ''
  }),
  methods: {
    register(e) {
      e.preventDefault()
      this.$store
        .dispatch('users/register', this.form)
        .then(() => {
          this.$router.push('/user/profile')
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
