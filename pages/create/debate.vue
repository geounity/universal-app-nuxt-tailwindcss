<template lang="pug">
  main
    h1.text-4xl.font-bold.text-center.mt-6 Abrir un debate
    form.max-w-3xl.px-2.mx-auto
      .mt-4
        label.block.text-gray-700.text-md.font-bold.mb-1(for="title") Título
        input.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(
          class="focus:outline-none focus:shadow-outline"
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Título del debate"
          maxlength="100"
        )
      .mt-4
        label.block.text-gray-700.text-md.font-bold.mb-1(for="description") Descripción
        textarea.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight.h-20(
          class="focus:outline-none focus:shadow-outline"
          id="description"
          v-model="form.description"
          type="text"
          placeholder="Una descripción del problema. Se objetivo. Luego de abrir el debate podrás dar tu punto de vista."
        )
      .mt-4
        figure(v-if="form.fileUrl.length>0")
          img(:src="form.fileUrl").h-32.w-auto
        label.block.text-gray-700.text-md.font-bold.mb-1(for="file") Imagenes
        button(type="button" @click.prevent="selectFile").inline-block.bg-blue-500.rounded.text-sm.text-white.font-bold.px-4.py-2.mr-2 Agregar imagen
        p.inline-block.text-gray-600 Por el momento solo podrá agregar una imagen.
        input(id="file" type="file" name="file" :multiple="false" ref="uploadInput" accept="image/*" @change="detectFile($event)").absolute.invisible
      .mt-6.flex.flex-wrap
        label.w-full.block.text-gray-700.text-md.font-bold(for="description") Comunidad que participará
        p.w-full.inline-block.text-gray-600.mb-1 Puede seleccionar las subcomunidades que desee.
        //- Continents
        div(class="w-1/2 md:w-1/3 lg:w-1/4").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-1(for="description") Continentes
          v-select(
            id="grid-continent"
            class="focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Global"
            :options="continents"
            @input="selectedContinent"
          )
            //- option Global
            //- option(v-for="continent in continents" :key="continent.uuid" :value="continent.uuid") {{continent.name}}
        //- Countries
        div(class="w-1/2 md:w-1/3 lg:w-1/4").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-1(for="description") Paises
          v-select(
            id="grid-countries"
            class="focus:outline-none focus:bg-white focus:border-gray-500"
            :disabled="disabledCountries"
            :options="countries"
            @input="selectedCountry"
          )
            //- option(v-for="country in countries" :key="country
    selectedState(value) {
      this.form.geopolitic_uuid = value.uuid
      const state = value.label
      
        //- States
        div(class="w-1/2 md:w-1/3 lg:w-1/4").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-1(for="description") Provincias
          v-select(
            id="grid-countries"
            class="focus:outline-none focus:bg-white focus:border-gray-500"
            :disabled="hiddenStates"
            :options="states"
            @input="selectedState"
          )
            //- option(v-for="state in states" :key="state") {{state}}
      .mt-8.flex.flex-wrap
        label.w-full.block.text-gray-700.text-md.font-bold.mb-1 Caracteres permitidos
        div(class="w-1/2 md:w-1/3").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-1(for="min") Mínimo
          input.shadow.appearance-none.w-32.border.rounded.py-2.px-3.text-gray-700.leading-tight(
            class="focus:outline-none focus:shadow-outline"
            id="min"
            v-model="form.char_min"
            type="number"
            min="2"
            max="200"
          )
        div(class="w-1/2 md:w-1/3").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-1(for="max") Máximo
          input.shadow.appearance-none.w-32.border.rounded.py-2.px-3.text-gray-700.leading-tight(
            class="focus:outline-none focus:shadow-outline"
            id="max"
            v-model="form.char_max"
            type="number"
            min="10"
            max="500"
          )
        p.inline-block.text-gray-600.mt-1 Es la cantidad de caracteres que cada usuario podrá usar para opinar.
      .mt-5
        h3.w-full.block.text-gray-700.text-md.font-bold.mb-1 Categoría
        input(type="radio" v-model="form.type" id="r1" name="categoty" value="geopolitics")
        label(for="r1").font-bold.ml-2.text-gray-800.text-md Regional: #[i.text-gray-600.text-xs Participarán las subcomunidades internas]
        <br/>
        input(type="radio" v-model="form.type" id="r2" name="categoty" value="ideologics")
        label(for="r2").font-bold.ml-2.text-gray-800.text-md Política: #[i.text-gray-600.text-xs Participarán los partídos políticos de la comunidad]
        <br/>
        input(type="radio" v-model="form.type" id="r3" name="categoty" value="bussines")
        label(for="r3").font-bold.ml-2.text-gray-800.text-md Religión: #[i.text-gray-600.text-xs Participarán las religiones de la comunidad]
      .mt-4.h-16
        strong {{form.public?'Publico':'Privado'}}
        span(v-if="form.public" @click="form.public=!form.public").border.rounded-full.border-grey.flex.items-center.cursor-pointer.w-12.bg-green-600.justify-end
          span.rounded-full.border.w-6.h-6.border-grey.shadow-inner.bg-white.shadow          
        span(v-else @click="form.public=!form.public").border.rounded-full.border-grey.flex.items-center.cursor-pointer.w-12.justify-start
          span.rounded-full.border.w-6.h-6.border-grey.shadow-inner.bg-white.shadow
        p(v-if="form.public").inline-block.text-gray-600.mt-1 Los debates públicos serán vistos por todos los usuarios y cualquier usuario dentro de la comunidad podrá opinar.
        p(v-else).inline-block.text-gray-600.mt-1 Los debates privados serán vistos solo por los usuarios dentro de la comunidad y solo un grupo pre-selecionado podrá opinar.
      .mt-12
        button(type="submit" @click="openDebate" class="hover:bg-teal-600").my-10.bg-teal-500.text-white.font-bold.py-2.px-4.rounded.w-full Abrir debate
</template>

<script>
import { mapGetters } from 'vuex'
import { storage } from '~/services/firebase'
export default {
  name: 'CreateDebate',
  middleware: 'authenticated',
  data: () => ({
    continents: [],
    countries: [],
    states: [],
    disabledCountries: true,
    hiddenStates: true,
    form: {
      title: '',
      description: '',
      fileUrl: [],
      geopolitic_uuid: '',
      char_min: 2,
      char_max: 300,
      type: '',
      public: true
    },
    selectCountry: '',
    error: '',
    loading: false,
    progressUpload: 0,
    uploadTask: ''
  }),
  computed: {
    ...mapGetters({
      images: 'debates/images'
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
            this.form.fileUrl[0] = downloadURL
            this.$store.commit('debates/ADD_IMAGE', downloadURL)
            this.loading = false
          })
        }
      )
    }
  },
  // Para traer los continentes
  async mounted() {
    const uuid = await this.$axios.$get('/geocommunities/global/uuid')
    this.form.geopolitic_uuid = uuid.body
    const data = await this.$axios.$get('/geocommunities/continents')
    this.continents = data.body.map((item) => {
      return {
        label: item.name,
        uuid: item.uuid
      }
    })
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
      const formattedTitle = this.form.title.replace(/ /g, '-').toLowerCase()
      const filename =
        formattedTitle + '-' + this.$store.getters['users/username']
      this.uploadTask = storage.ref('images/debates/' + filename).put(file)
    },
    deleteImage() {
      this.loading = true
      // this.$store.dispatch('users/delete_image', this.formInfo.fileUrl)
      this.loading = false
    },

    async selectedContinent(value) {
      this.form.geopolitic_uuid = value.uuid
      const continent = value.label
      this.disabledCountries = false
      const data = await this.$axios.$get(
        `/geocommunities/${continent}/countries`
      )
      this.countries = data.body.map((item) => {
        return {
          label: item.name,
          uuid: item.uuid
        }
      })
    },
    async selectedCountry(value) {
      this.form.geopolitic_uuid = value.uuid
      const country = value.label
      this.selectCountry = value.label
      this.hiddenStates = false
      const data = await this.$axios.$get(`/geocommunities/${country}/states`)
      this.states = data.body.map((item) => {
        return {
          label: item.name,
          uuid: item.uuid
        }
      })
    },
    openDebate(e) {
      e.preventDefault()
      this.$store.dispatch('debates/open_debate', this.form)
    }
  }
}
</script>
