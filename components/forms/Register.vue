<template lang="pug">
  .w-full.max-w-md.mt-5.mx-auto
    form(class="md:px-8").bg-white.shadow-lg.rounded.px-6.py-4.mt-3.mx-2
      h2.text-2xl.font-bold.mb-4.text-center Registrate en segundos
      .mb-1
        label.block.text-gray-700.text-sm.font-bold.mb-1(for='username')
          | Nombre de usuario
        input#username.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.username" @input="handleInputUsername" @focus="error=false" class='focus:outline-none focus:shadow-outline' :class="{allowedOutline: allowedUsername}" type='text' placeholder='Username' maxlength="15")
        span.text-left.text-gray-600.text-xs(:class="{allowed: allowedUsername}") {{charsUsername}}/15
      .mb-4
        label.block.text-gray-700.text-sm.font-bold.mb-1(for='email')
          | Correo electrónico
        input#email.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(v-model="form.email" @input="handleInputEmail" @focus="error=false" class='focus:outline-none focus:shadow-outline' :class="{allowedOutline: allowedEmail}" type='email' placeholder='email@example.com')
      .mb-2
        label.block.text-gray-700.text-sm.font-bold.mb-1(for='password')
          | Contraseña
        input#password.shadow.appearance-none.border.border.rounded.w-full.py-2.px-3.text-gray-700.mb-3.leading-tight(v-model="form.password" @input="handleInputPass" @focus="error=false" class='focus:outline-none focus:shadow-outline' :class="{allowedOutline: allowedPassword}" type='password' placeholder='******************')
      .mb-4
        label(class="block text-gray-500 font-bold").text-left
          input.mr-2.leading-tight(type="checkbox" v-model="form.checkbox")
          span.text-sm Acepto los terminos y condiciones.
      .mb-4.bg-red-300.border-l-4.border-red-700.text-red-800.text-left.p-4(v-if="error" role="alert")
        p {{ errorCode }}
        p.font-bold.text-sm {{ errorMsg }}
      p.text-red-800 {{ errorVuex }}
      div
        button(@click="register" class='hover:bg-teal-600 focus:outline-none focus:shadow-outline' type='button').py-2.px-4.bg-teal-500.text-gray-100.font-bold.border-teal-600.rounded.w-full
          | Crear tu usuario
      h5.my-4.text-center.text-sm.text-gray-500 ------------------- O registrate con: -------------------
      .flex.flex-col.items-center(class="md:flex")
        button(type="button" @click="authWithGoogle").google-button.border.border-gray-400.bg-gray-200.mb-2.p-0.rounded.w-full
          span.google-button__icon
            <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
              <path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/>
            </svg>
          span.google-button__text.font-bold Sign in with Google
        button(type="button" @click="authWithFacebook").facebook-button.border.border-gray-400.bg-gray-200.p-0.rounded.text-white.w-full
          span.facebook-button__icon
            img(src="/facebook.svg" alt="Logo de facebook")
          span.facebook-button__text.font-bold Sign in with Facebook
      nuxt-link.inline-block.align-baseline.font-bold.text-center.text-sm.text-purple-500.w-full(to="/auth/signin" class='hover:text-purple-800' href='#')
        | ¿Ya tienes un usuario? Inicia sesión
    p.text-center.text-gray-100.text-xs
      | &copy;2019 Geounity Organization. All rights reserved.
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'FormRegister',
  data: () => ({
    allowedEmail: false,
    allowedUsername: false,
    allowedPassword: false,
    charsUsername: 0,
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
  computed: {
    ...mapState({
      errorVuex: (state) => state.users.error
    })
  },
  methods: {
    authWithGoogle() {
      this.$store.dispatch('users/auth_google').catch((error) => {
        this.error = true
        this.errorCode = error.code
        this.errorMsg = error.message
        setTimeout(() => {
          this.error = false
        }, 10000)
      })
    },
    authWithFacebook() {
      this.$store.dispatch('users/auth_facebook').catch((error) => {
        this.error = true
        this.errorCode = error.code
        this.errorMsg = error.message
        setTimeout(() => {
          this.error = false
        }, 10000)
      })
    },
    handleInputEmail() {
      this.allowedEmail = this.validateEmail(this.form.email)
    },
    handleInputUsername() {
      this.charsUsername = this.form.username.length
      if (this.charsUsername < 3) {
        this.allowedUsername = false
      } else {
        this.allowedUsername = true
      }
    },
    handleInputPass() {
      if (this.form.password.length < 6) {
        this.allowedPassword = false
      } else {
        this.allowedPassword = true
      }
    },
    register(e) {
      e.preventDefault()
      if (!this.form.checkbox) {
        this.error = true
        this.errorMsg = 'Debe aceptar nuestros terminos y condiciones'
        setTimeout(() => {
          this.error = false
        }, 10000)
      }
      if (!this.allowedUsername) {
        this.error = true
        this.errorMsg =
          'El nombre de usuario debe tener entre 3 y 15 caracteres alfanuméricos'
        setTimeout(() => {
          this.error = false
        }, 10000)
      }
      if (!this.allowedEmail) {
        this.error = true
        this.errorMsg = 'El correo que ingreso es incorrecto'
        setTimeout(() => {
          this.error = false
        }, 10000)
      }
      if (!this.allowedPassword) {
        this.error = true
        this.errorMsg = 'La contraseá debe tener al menos 6 caracteres'
        setTimeout(() => {
          this.error = false
        }, 10000)
      }
      if (
        this.form.checkbox &&
        this.allowedUsername &&
        this.allowedEmail &&
        this.allowedPassword
      ) {
        this.$store.dispatch('users/register', this.form).catch((error) => {
          if (error.code.match(/auth\/email-already-in-use/)) {
            this.errorMsg = 'Intente con otro email por favor'
          }
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 10000)
        })
      }
    },
    validateEmail(email) {
      // eslint-disable-next-line no-console
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }
}
</script>

<style scoped>
.allowed {
  color: teal;
  font-weight: bold;
}
.allowedOutline {
  box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.5);
}
.google-button,
.facebook-button {
  height: 40px;
  color: #737373;
  white-space: nowrap;
  box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
  transition-property: background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
}

.google-button:focus,
.google-button:hover,
.facebook-button:focus,
.facebook-button:hover {
  box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
}

.google-button:active {
  background-color: #e5e5e5;
  box-shadow: none;
  transition-duration: 10ms;
}

.google-button__icon,
.facebook-button__icon {
  display: inline-block;
  vertical-align: middle;
  margin: 8px 0 8px 8px;
  width: 22px;
  height: 22px;
  box-sizing: border-box;
}

.google-button__icon--plus {
  width: 27px;
}

.google-button__text,
.facebook-button__text {
  display: inline-block;
  vertical-align: middle;
  padding: 0 24px;
  font-size: 14px;
}
.facebook-button {
  background-color: #4267b2;
  color: white;
}
</style>
