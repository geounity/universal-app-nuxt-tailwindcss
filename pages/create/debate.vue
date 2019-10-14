<template lang="pug">
  main
    h1.text-3xl.font-bold.text-center.mt-6 Abrir un debate
    form.max-w-3xl.px-2.mx-auto
      .mt-4
        label.block.text-gray-700.text-md.font-bold.mb-2(for="title") Título
        input.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(
          class="focus:outline-none focus:shadow-outline"
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Título del debate"
        )
      .mt-4
        label.block.text-gray-700.text-md.font-bold.mb-2(for="description") Descripción
        textarea.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight.h-20(
          class="focus:outline-none focus:shadow-outline"
          id="description"
          v-model="form.description"
          type="text"
          placeholder="Una descripción del problema. Se objetivo. Luego de abrir el debate podrás dar tu punto de vista."
        )
      .mt-4.flex.flex-wrap
        label.w-full.block.text-gray-700.text-md.font-bold.mb-2(for="description") Comunidad que participará
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
            //- option(v-for="country in countries" :key="country") {{country}}
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
      .mt-4
        button(type="submit" @click="openDebate").mt-5.bg-teal-500.text-white.font-bold.py-2.px-4.rounded.w-full Abrir debate
</template>

<script>
import api from '~/services/apiMongo'
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
      geopolitic_uuid: ''
    }
  }),
  // Para traer los continentes
  async mounted() {
    const uuid = await api.get('/geocommunities/global/uuid')
    this.form.geopolitic_uuid = uuid.data.body
    const { data } = await api.get('/geocommunities/continents')
    this.continents = data.body.map((item) => {
      return {
        label: item.name,
        uuid: item.uuid
      }
    })
  },
  methods: {
    async selectedContinent(value) {
      this.form.geopolitic_uuid = value.uuid
      const continent = value.label
      this.disabledCountries = false
      const { data } = await api.get(`/geocommunities/${continent}/countries`)
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
      this.hiddenStates = false
      const { data } = await api.get(`/geocommunities/${country}/states`)
      this.states = data.body.map((item) => {
        return {
          label: item.name,
          uuid: item.uuid
        }
      })
    },
    selectedState(value) {
      this.form.geopolitic_uuid = value.uuid
    },
    openDebate(e) {
      e.preventDefault()
      this.$store.dispatch('debate/open_debate', this.form)
    }
  }
}
</script>
