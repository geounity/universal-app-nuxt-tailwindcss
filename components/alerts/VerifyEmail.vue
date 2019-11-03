<template lang="pug">
  div
    div(v-if="status==='sended'" role="alert").bg-yellow-200.border.border-l-4.border-yellow-600.text-left.text-yellow-900.p-4.mx-4
      p.font-bold.text-xl Debemos verificar su correo
      p.text-lg Le hemos enviado un correo de confirmación a su correo <i>{{ email }}</i>
      p.text-md Verificar su correo le permitirá abrir debates y opinar.
      button(type="button" @click="resend" class="hover:bg-blue-700").bg-blue-600.mt-2.px-4.py-2.text-white Enviar de nuevo
    div(v-if="status==='resended'" role="alert").bg-green-200.border.border-l-4.border-green-600.text-left.text-green-900.p-4.mx-4
      p.font-bold.text-xl Correo de confirmación reenviado
      p.text-lg Si no encuentre el correo busque en la sección de spam <i>{{ email }}</i>
      p.text-md Verificar su correo le permitirá abrir debates y opinar.
    
</template>

<script>
export default {
  data() {
    return {
      status: 'sended'
    }
  },
  computed: {
    email() {
      return this.$store.state.users.user.email
    }
  },
  methods: {
    resend() {
      this.$store
        .dispatch('users/resend_email_verification')
        .then(() => (this.status = 'resended'))
    }
  }
}
</script>
