<template lang="pug">
  .container.flex.flex-col
    h1.text-5xl.font-black {{ username }}
    form.flex.flex-col.px-4
      figure
        img(:src="avatar?avatar:'/sinfoto.png'" width="200px").mx-auto
      button.mt-5.bg-purple-500.text-white.font-bold.py-2.px-4.rounded Subir foto
      input(id="file" type="file" name="file" ref="uploadInput" accept="image/*" @change="detectFiles($event)").mt-4
      div(v-if="avatar")
        button.mr-2.mt-5.bg-red-500.text-white.font-bold.py-2.px-4.rounded.w-full Borrar imagen
      label(for="name").block.text-gray-700.text-sm.font-bold.mt-4 Nombre
        input(v-model="formInfo.name" id="name" placeholder="Ingresa tu nombre" class="focus:outline-none focus:shadow-outline" type="text").text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      label(for="lastname").block.text-gray-700.text-sm.font-bold.mt-4 Apellido
        input(v-model="formInfo.lastname" id="lastname" placeholder="Ingresa tu apellido" class="focus:outline-none focus:shadow-outline" type="text").text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      label(for="service").block.text-gray-700.text-sm.font-bold.mt-4 Cuentanos que servicio brindas a tu comunidad
        input(v-model="formInfo.lastname" id="service" placeholder="Servicio" class="focus:outline-none focus:shadow-outline" type="text").text-center.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight
      span.text-xs.text-gray-600.font-hairline.italic.text-left Puede ser tu empleo, lo que aprendes, lo que vendes o lo que estas construyendo.
    
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data: () => ({
    formInfo: {
      datebirth: '',
      fileName: '',
      lastname: '',
      name: '',
      service: ''
    }
  }),
  computed: {
    ...mapGetters({
      username: 'users/username',
      avatar: 'users/avatar'
    })
  }
}
</script>
