<template lang="pug">
  .flex.flex-col.items-center.mt-5.text-center
    div(v-if="isAuth").text-center
      div(v-if="!isVerified")
        div(role="alert").bg-yellow-200.border-l-4.border-yellow-600.text-left.text-yellow-900.p-4.mx-4
          p.font-bold Debemos verificar su correo
          p Le hemos enviado un correo de confirmación
          button(type="button" @click="resend") Enviar de nuevo
    div(v-if="!username" role="alert").bg-yellow-200.border-l-4.border-yellow-600.text-left.text-yellow-900.p-4
      p.font-bold Define un username
      p Debes definir un nombre de usuario para empezar a crear contenido.
    h1.text-5xl.font-black {{ username }}
    form.flex.flex-col.mt-4.px-4(class="lg:flex-row lg:flex-wrap lg:justify-around")
      div(class="lg:w-1/2").px-5
        //- Username
        label(v-if="!username" for="username").block.text-gray-700.text-sm.font-bold.mt-4 Username
          <br/>
          input(v-model="formInfo.username" @input="handleInputUsername" id="username" placeholder="Ingresa un nombre de usuario" class="focus:outline-none focus:shadow-outline" type="text" maxlength="15").text-center.shadow.appearance-none.border.rounded.py-2.px-6.text-gray-700.text-xl.w-64
          <br/>
          span.text-left.text-gray-600.text-xs(:class="{allowed: allowedUsername}") {{charsUsername}}/15
        //- Avatar
        figure
          img(:src="avatar?avatar:'/sinfoto.png'" @click.prevent="selectFile" class="avatar").mx-auto.rounded-full
        h3.text-lg.text-red-600 {{ error }}
        div(v-if="!(progressUpload===0 || progressUpload===100)" :style="{width:progressUpload+'%'}").bg-teal-500.font-semibold.mt-4.text-white {{ progressUpload }}%
        div(v-if="avatar").mt-2
          button(class="hover:bg-red-600").bg-red-500.text-white.font-bold.py-2.px-4.rounded.w-40 Borrar foto
        div.mt-2
          button(v-if="!loading" @click.prevent="selectFile" class="hover:bg-purple-600").bg-purple-500.text-white.font-bold.py-2.px-4.rounded.w-40 {{avatar?'Actualizar foto':'Subir foto'}}
        input(id="file" type="file" name="file" :multiple="false" ref="uploadInput" accept="image/*" @change="detectFile($event)").absolute.invisible
        //- Link
        label(for="link").block.text-gray-700.text-sm.font-bold.mt-4 Link
          input(v-model="formInfo.link" id="link" placeholder="Ingresa un link personal" class="focus:outline-none focus:shadow-outline" type="url").text-lg.text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      div(class="lg:w-1/2").px-5
        //- Name
        label(for="name").block.text-gray-700.text-sm.font-bold.mt-4 Nombre
          input(v-model="formInfo.name" id="name" placeholder="Ingresa tu nombre" class="focus:outline-none focus:shadow-outline" type="text").text-lg.text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
        //- Lastname
        label(for="lastname").block.text-gray-700.text-sm.font-bold.mt-4 Apellido
          input(v-model="formInfo.lastname" id="lastname" placeholder="Ingresa tu apellido" class="focus:outline-none focus:shadow-outline" type="text").text-lg.text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
        //- Show names
        div.flex.mt-1
          span(v-if="formInfo.show_name" @click="formInfo.show_name=!formInfo.show_name").border.rounded-full.border-grey.flex.items-center.cursor-pointer.w-12.bg-green-600.justify-end
            span.rounded-full.border.w-6.h-6.border-grey.shadow-inner.bg-white.shadow          
          span(v-else @click="formInfo.show_name=!formInfo.show_name").border.rounded-full.border-grey.flex.items-center.cursor-pointer.w-12.justify-start
            span.rounded-full.border.w-6.h-6.border-grey.shadow-inner.bg-white.shadow
          i.ml-2 {{formInfo.show_name?'Mostrar':'Ocultar'}} nombres
        //- Service - Job
        label(for="service").block.text-gray-700.text-sm.font-bold.mt-4 Cuentanos que servicio brindas a tu comunidad
          input(v-model="formInfo.service" id="service" placeholder="Servicio" class="focus:outline-none focus:shadow-outline" type="text").text-lg.text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
        span.text-xs.text-gray-600.font-hairline.italic.text-left Puede ser tu empleo, lo que aprendes, lo que vendes o lo que estas construyendo.
        //- Datebirth
        label(for="dateofbirth").block.text-gray-700.text-sm.font-bold.mt-4 Fecha de nacimiento:
          input(v-model="formInfo.datebirth" type="date" name="dateofbirth" id="dateofbirth").text-lg.text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
        //- Show age
        div.flex.mt-1
          span(v-if="formInfo.show_age" @click="formInfo.show_age=!formInfo.show_age").border.rounded-full.border-grey.flex.items-center.cursor-pointer.w-12.bg-green-600.justify-end
            span.rounded-full.border.w-6.h-6.border-grey.shadow-inner.bg-white.shadow          
          span(v-else @click="formInfo.show_age=!formInfo.show_age").border.rounded-full.border-grey.flex.items-center.cursor-pointer.w-12.justify-start
            span.rounded-full.border.w-6.h-6.border-grey.shadow-inner.bg-white.shadow
          i.ml-2 {{formInfo.show_age?'Mostrar':'Ocultar'}} edad
      //- Success message
      div(v-if="success").mt-10 {{ successMsg }}
      //- Button send
      button(@click="updateInfoUser" class='hover:bg-teal-600 focus:outline-none focus:shadow-outline' type='button').my-10.py-3.border.border-b-2.border-teat-700.bg-teal-500.text-gray-100.font-bold.border-teal-600.rounded.w-full Actualizar mis datos
    h3.font-bold.text-lg Previsualización
    CardOpinion(
      :username="username",
      :avatar="avatar",
      :datebirth="formInfo.datebirth",
      :name="formInfo.name",
      :lastname="formInfo.lastname",
      :service="formInfo.service",
      :show_name="formInfo.show_name",
      :show_age="formInfo.show_age",
      :date="date",
      content="Texto de ejemplo. Usted podrá opinar sobre en un debate con un cantidad limitada de caracteres definida por el usuario que lo abrió."
    ).w-full
    
</template>

<script>
import { mapGetters } from 'vuex'
import { storage } from '~/services/firebase'
import CardOpinion from '~/components/cards/opinion'

export default {
  name: 'Profile',
  components: { CardOpinion },
  data: () => ({
    allowedUsername: false,
    charsUsername: 0,
    formInfo: {
      fileName: '',
      lastname: '',
      name: '',
      service: '',
      link: '',
      datebirth: '',
      username: '',
      show_name: true,
      show_age: true
    },
    date: new Date(),
    error: '',
    loading: false,
    progressUpload: 0,
    uploadTask: '',
    photoURL: '',
    success: false,
    successMsg: ''
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
    this.formInfo.username = this.$store.state.users.user.username
    this.formInfo.name = this.$store.state.users.user.name
    this.formInfo.lastname = this.$store.state.users.user.lastname
    this.formInfo.service = this.$store.state.users.user.service
    this.formInfo.datebirth = this.$store.state.users.user.datebirth
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
      if (this.charsUsername < 3) {
        this.allowedUsername = false
      } else {
        this.allowedUsername = true
      }
    },
    upload(file) {
      this.loading = true
      const filename = this.formInfo.username
      this.uploadTask = storage.ref('images/profiles/' + filename).put(file)
    },
    deleteImage() {
      this.loading = true
      this.$store.dispatch('users/delete_image', this.formInfo.fileName)
      this.loading = false
    },
    updateInfoUser() {
      if (!this.username) {
        const data = {
          ...this.formInfo,
          email: this.$store.state.users.user.email
        }
        this.$store.dispatch('users/save_user_in_database', data).then(() => {
          location.href = '/'
        })
      } else {
        this.$store
          .dispatch('users/update_info_user', this.formInfo)
          .then(() => {
            this.success = true
            this.successMsg = 'Los datos han sido actualizados'
            setTimeout(() => {
              this.success = false
            }, 5000)
          })
      }
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
