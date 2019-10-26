<template lang="pug">
  .flex.flex-col.items-center.mt-10.text-center
    div(v-if="isAuth").text-center
      div(v-if="isVerified")
        nuxt-link(to="/create/poll" tag="button" class="hover:bg-purple-600").bg-purple-500.text-white.font-bold.mt-5.py-2.px-4.rounded.w-64 Crear una encuesta
      div(v-else)
        div(role="alert").bg-yellow-200.border-l-4.border-yellow-600.text-left.text-yellow-900.p-4.mx-4
          p.font-bold Debemos verificar su correo
          p Le hemos enviado un correo de confirmación
    div(v-if="!username" role="alert").bg-yellow-200.border-l-4.border-yellow-600.text-left.text-yellow-900.p-4
      p.font-bold Define un username
      p Debes definir un nombre de usuario para empezar a crear contenido.
    h1.text-5xl.font-black {{ username }}
    form.flex.flex-col.mt-4.px-4
      label(v-if="!username" for="username").block.text-gray-700.text-sm.font-bold.mt-4 Username
        <br/>
        input(v-model="username" @input="handleInputUsername" id="username" placeholder="Ingresa un nombre de usuario" class="focus:outline-none focus:shadow-outline" type="text" maxlength="15").text-center.shadow.appearance-none.border.rounded.w-64.py-2.px-3.text-gray-700.leading-tight
        <br/>
        span.text-left.text-gray-600.text-xs(:class="{allowed: allowedUsername}") {{charsUsername}}/15
      figure.mt-4
        img(:src="avatar?avatar:'/sinfoto.png'" @click.prevent="selectFile" class="avatar" style="border-radius:50%").mx-auto
      h3.text-lg.text-red-600 {{ error }}
      div(v-if="progressUpload!==100" :style="{width:progressUpload+'%'}").bg-teal-500.font-semibold.mt-4.text-white {{ progressUpload }}%
      div(v-if="avatar").mt-4
        button(class="hover:bg-red-600").bg-red-500.text-white.font-bold.py-2.px-4.rounded.w-40 Borrar foto
      div
        button(v-if="!loading" @click.prevent="selectFile" class="hover:bg-purple-600").mt-4.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-40 Subir foto
      input(id="file" type="file" name="file" :multiple="false" ref="uploadInput" accept="image/*" @change="detectFile($event)").absolute.invisible
      label(for="name").block.text-gray-700.text-sm.font-bold.mt-4 Nombre
        input(v-model="formInfo.name" id="name" placeholder="Ingresa tu nombre" class="focus:outline-none focus:shadow-outline" type="text").text-lg.text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      label(for="lastname").block.text-gray-700.text-sm.font-bold.mt-4 Apellido
        input(v-model="formInfo.lastname" id="lastname" placeholder="Ingresa tu apellido" class="focus:outline-none focus:shadow-outline" type="text").text-lg.text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      label(for="service").block.text-gray-700.text-sm.font-bold.mt-4 Cuentanos que servicio brindas a tu comunidad
        input(v-model="formInfo.service" id="service" placeholder="Servicio" class="focus:outline-none focus:shadow-outline" type="text").text-lg.text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      span.text-xs.text-gray-600.font-hairline.italic.text-left Puede ser tu empleo, lo que aprendes, lo que vendes o lo que estas construyendo.
      button(@click="updateInfoUser" class='hover:bg-teal-600 focus:outline-none focus:shadow-outline' type='button').mt-10.py-3.border.border-b-2.border-teat-700.bg-teal-500.text-gray-100.font-bold.border-teal-600.rounded.w-full Actualizar mis datos
    
</template>

<script>
import { mapGetters } from 'vuex'
import { storage } from '~/services/firebase'

export default {
  name: 'Profile',
  data: () => ({
    allowedUsername: false,
    charsUsername: 0,
    formInfo: {
      datebirth: '',
      fileName: '',
      lastname: '',
      name: '',
      service: ''
    },
    error: '',
    loading: false,
    progressUpload: 0,
    uploadTask: '',
    photoURL: ''
  }),
  computed: {
    ...mapGetters({
      username: 'users/username',
      avatar: 'users/avatar',
      isAuth: 'users/isAuth',
      isVerified: 'users/isVerified'
    })
  },
  watch: {
    uploadTask() {
      this.uploadTask.on(
        'state_changed',
        (sp) => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          )
        },
        (error) => (this.error = 'Error al cargar la imagen: ' + error),
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.formInfo.fileName = downloadURL
            this.$store.commit('users/ADD_PHOTO', downloadURL)
            this.loading = false
          })
        }
      )
    }
  },
  mounted() {
    this.formInfo.name = this.$store.state.users.user.name
    this.formInfo.lastname = this.$store.state.users.user.lastname
    this.formInfo.service = this.$store.state.users.user.service
  },
  methods: {
    selectFile() {
      this.$refs.uploadInput.click()
    },
    detectFile(event) {
      const fileList = event.target.files || event.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.upload(fileList[x])
      })
    },
    handleInputUsername() {
      this.charsUsername = this.formInfo.username.length
      this.username = this.formInfo.username
      if (this.charsUsername < 3) {
        this.allowedUsername = false
      } else {
        this.allowedUsername = true
      }
    },
    upload(file) {
      this.loading = true
      const filename = this.username
      this.uploadTask = storage.ref('images/profiles/' + filename).put(file)
    },
    deleteImage() {
      this.loading = true
      this.$store.dispatch('users/delete_image', this.formInfo.fileName)
      this.loading = false
    },
    updateInfoUser() {
      const data = {
        ...this.formInfo,
        username: this.username
      }
      this.$store.dispatch('users/update_info_user', data).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
.allowed {
  color: teal;
  font-weight: bold;
}
.avatar {
  height: 200px;
  width: 200px;
}
</style>
