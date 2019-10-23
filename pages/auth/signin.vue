<template lang="pug">
  .container.bg-gray-500
    .w-full.max-w-md.text-center
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
        .mb-4.bg-red-300.border-l-4.border-red-700.text-red-800.text-left.p-4(v-if="error" role="alert")
          p.font-bold.text-sm {{ errorMsg }}
          p {{ errorCode }}
        .mb-2
          button(@click="login" class='hover:bg-teal-600 focus:outline-none focus:shadow-outline' type='button').py-2.px-4.bg-teal-500.text-gray-100.font-bold.border-teal-600.rounded.w-full
            | Iniciar sesión
        h5.mb-2.text-sm.text-gray-500 ------------------- O inicia con: -------------------
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
        nuxt-link.inline-block.align-baseline.font-bold.text-sm.text-purple-500.w-full(to="/login" class='hover:text-purple-800' href='#')
          | ¿Olvidaste la contraseña?
            
      p.text-center.text-gray-500.text-xs
        | &copy;2019 Geounity Organization. All rights reserved.
</template>

<script>
export default {
  name: 'SignIn',
  middleware: ['authenticated'],
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
    },
    authWithGoogle() {
      this.$store
        .dispatch('users/auth_google')
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
    },
    authWithFacebook() {
      this.$store
        .dispatch('users/auth_facebook')
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

<style scoped>
.container {
  min-width: 100vw;
}
.google-button,
.faceboo-button {
  height: 40px;
  color: #737373;
  white-space: nowrap;
  box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
  transition-property: background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
}

.google-button:focus,
.google-button:hover {
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
}
</style>
