<template lang="pug">
  .container.flex.flex-col
    h1.text-5xl.font-black {{ username }}
    form.flex.flex-col.px-4
      figure
        img(:src="avatar?avatar:'/sinfoto.png'" class="avatar" style="border-radius:50%").mx-auto
      h3.text-lg.text-red-600 {{ error }}
      button(v-if="!loading" @click.prevent="selectFile").mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded Subir foto
      input(id="file" type="file" name="file" :multiple="false" ref="uploadInput" accept="image/*" @change="detectFile($event)").invisible
      div(:style="{width:progressUpload+'%'}" class="lala").font-semibold {{ progressUpload }}%
      div(v-if="avatar")
        button.mr-2.bg-red-500.text-white.font-bold.py-2.px-4.rounded.w-full Borrar imagen
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
import { storage } from '~/plugins/firebase'

export default {
  name: 'Profile',
  middleware: ['authenticated'],
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
            this.loading = false
            this.$store.commit('users/ADD_PHOTO', downloadURL)
          })
        }
      )
    }
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
      const filename = this.username + 'Profile'
      this.formInfo.fileName = filename
      this.uploadTask = storage.ref('images/' + filename).put(file)
      this.loading = false
    },
    deleteImage() {
      this.loading = true
      this.$store.dispatch('users/delete_image', this.formInfo.fileName)
      this.loading = false
    },
    updateInfoUser() {
      this.$store.dispatch('users/update_info_user', this.formInfo).then(() => {
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
