<template lang="pug">
  .w-full.max-w-sm.text-center
    form(class="md:px-8").bg-white.shadow-lg.rounded.px-6.py-4.mt-3.mx-2
      h2.text-2xl.font-bold.mb-4 Registrate en segundos
      .mb-4
        label.block.text-gray-700.text-sm.font-bold.mb-1(for='username')
          | Nombre de usuario
        input#username.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.username" class='focus:outline-none focus:shadow-outline' type='text' placeholder='Username' maxlength="15")
      .mb-4
        label.block.text-gray-700.text-sm.font-bold.mb-1(for='email')
          | Correo electrónico
        input#email.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.email" class='focus:outline-none focus:shadow-outline' type='email' placeholder='email@example.com')
      .mb-2
        label.block.text-gray-700.text-sm.font-bold.mb-1(for='password')
          | Contraseña
        input#password.shadow.appearance-none.border.border.rounded.w-full.py-2.px-3.text-gray-700.mb-3.leading-tight(v-model="form.password" class='focus:outline-none focus:shadow-outline' type='password' placeholder='******************')
      .mb-6
        label(class="block text-gray-500 font-bold").text-left
          input.mr-2.leading-tight(type="checkbox" v-model="form.checkbox")
          span.text-sm Acepto los terminos y condiciones.
      .absolute(v-if="error")
        p.text-red-600.text-xs.italic.text-md.relative.error
          b {{ errorMsg }}
      .mb-2
        button(@click="register" class='hover:bg-teal-600 focus:outline-none focus:shadow-outline' type='button').py-2.px-4.bg-teal-500.text-gray-100.font-bold.border-teal-600.rounded.w-full
          | Crear tu usuario
      nuxt-link.inline-block.align-baseline.font-bold.text-sm.text-purple-500.w-full(to="/login" class='hover:text-purple-800' href='#')
        | ¿Ya tienes un usuario? Inicia sesión
    p.text-center.text-gray-100.text-xs
      | &copy;2019 Geounity Organization. All rights reserved.
</template>

<script>
export default {
  name: 'FormRegister',
  data: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      checkbox: false
    },
    error: false,
    errorCode: '',
    errorMsg: ''
  }),
  methods: {
    register(e) {
      e.preventDefault()
      if (!this.form.checkbox) {
        this.error = true
        this.errorMsg = 'Debe aceptar nuestros terminos y condiciones'
        setTimeout(() => {
          this.error = false
        }, 10000)
      } else {
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
}
</script>

<<style>
.error {
  bottom: 24px;
}
</style>
