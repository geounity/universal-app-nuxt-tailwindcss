<template lang="pug">
  .flex.flex-col.items-center.mt-10.text-center
    div(v-if="!username" role="alert").bg-yellow-200.border-l-4.border-yellow-600.text-left.text-yellow-900.p-4
      p.font-bold Define un username
      p Debes definir un nombre de usuario para empezar a crear contenido.
    h1.text-5xl.font-black {{ username }}
    form.flex.flex-col.mt-4.px-4
      label(for="name").block.text-gray-700.text-sm.font-bold.mt-4 Username
        input(v-model="username" id="username" placeholder="Ingresa un nombre de usuario" class="focus:outline-none focus:shadow-outline" type="text").text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      figure.mt-4
        img(:src="avatar?avatar:'/sinfoto.png'" @click.prevent="selectFile" class="avatar" style="border-radius:50%").mx-auto
      h3.text-lg.text-red-600 {{ error }}
      div(v-if="avatar").mt-4
        button.bg-red-500.text-white.font-bold.py-2.px-4.rounded.w-40 Borrar foto
      div
        button(v-if="!loading" @click.prevent="selectFile").mt-4.bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-40 Subir foto
      input(id="file" type="file" name="file" :multiple="false" ref="uploadInput" accept="image/*" @change="detectFile($event)").absolute.invisible
      div(:style="{width:progressUpload+'%'}" class="lala").font-semibold {{ progressUpload }}%
      label(for="name").block.text-gray-700.text-sm.font-bold.mt-4 Nombre
        input(v-model="formInfo.name" id="name" placeholder="Ingresa tu nombre" class="focus:outline-none focus:shadow-outline" type="text").text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      label(for="lastname").block.text-gray-700.text-sm.font-bold.mt-4 Apellido
        input(v-model="formInfo.lastname" id="lastname" placeholder="Ingresa tu apellido" class="focus:outline-none focus:shadow-outline" type="text").text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      label(for="service").block.text-gray-700.text-sm.font-bold.mt-4 Cuentanos que servicio brindas a tu comunidad
        input(v-model="formInfo.service" id="service" placeholder="Servicio" class="focus:outline-none focus:shadow-outline" type="text").text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      span.text-xs.text-gray-600.font-hairline.italic.text-left Puede ser tu empleo, lo que aprendes, lo que vendes o lo que estas construyendo.
      button(@click="updateInfoUser" class='hover:bg-teal-600 focus:outline-none focus:shadow-outline' type='button').mt-4.py-2.px-4.bg-teal-500.text-gray-100.font-bold.border-teal-600.rounded.w-full Actualizar mis datos
    
</template>

<script>
import { mapGetters } from 'vuex'
import { storage } from '~/services/firebase'

export default {
  name: 'Profile',
  data: () => ({
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
      avatar: 'users/avatar'
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
.avatar {
  height: 200px;
  width: 200px;
}
.lala {
  background-color: green;
  color: white;
}
</style>
