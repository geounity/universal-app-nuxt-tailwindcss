<template lang="pug">
  main
    h1.text-3xl.font-bold.text-center.mt-6 Abrir un debate
    form(method="post").max-w-3xl.px-2.mx-auto
      .mt-4
        label.block.text-gray-700.text-sm.font-bold.mb-2(for="title") Título
        input.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(
          class="focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Título del debate"
        )
      .mt-4
        label.block.text-gray-700.text-sm.font-bold.mb-2(for="description") Descripción
        textarea.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight.h-20(
          class="focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          placeholder="Una descripción del problema. Se objetivo. Luego de abrir el debate podrás dar tu punto de vista."
        )
      .mt-4.flex.flex-wrap
        label.w-full.block.text-gray-700.text-sm.font-bold.mb-2(for="description") Comunidad que participará
        //- Continents
        div(class="w-1/2 md:w-1/3 lg:w-1/4").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-2(for="description") Continentes
          select.block.w-full.bg-gray-200.border.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.mb-4.rounded.leading-tight(
            id="grid-continent"
            class="focus:outline-none focus:bg-white focus:border-gray-500"
            @change="selectedContinent"
          )
            option Global
            option(v-for="continent in continents" :key="continent") {{continent}}
        //- Countries
        div(class="w-1/2 md:w-1/3 lg:w-1/4").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-2(for="description") Paises
          select.block.w-full.bg-gray-200.border.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.mb-4.rounded.leading-tight(
            id="grid-countries"
            class="focus:outline-none focus:bg-white focus:border-gray-500"
            :disabled="disabledCountries"
            @change="selectedCountry"
          )
            option(v-for="country in countries" :key="country") {{country}}
        //- States
        div(class="w-1/2 md:w-1/3 lg:w-1/4").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-2(for="description") Provincias
          select.block.w-full.bg-gray-200.border.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.rounded.leading-tight(
            id="grid-countries"
            class="focus:outline-none focus:bg-white focus:border-gray-500"
            :disabled="hiddenStates"
          )
            option(v-for="state in states" :key="state") {{state}}
      .mt-4
        button.mt-5.bg-teal-500.text-white.font-bold.py-2.px-4.rounded.w-full Abrir debate
      h1.text-3xl {{mensaje}}
</template>

<script>
import api from '~/services/apiMongo'
export default {
  name: 'CreateDebate',
  data: () => ({
    continents: ['Africa', 'Asia', 'Americas', 'Europa', 'Oceania'],
    countries: [],
    disabledCountries: true,
    states: [],
    hiddenStates: true,
    mensaje: 'Mensaje vacio'
  }),
  // Para traer los continentes
  // async mounted() {
  //   const {data} = await api.get('/geocommunities/continents')
  //   this.continents = data.body.map((item) => item.name)
  // },
  methods: {
    async selectedContinent(event) {
      const continent = event.target.value
      this.disabledCountries = false
      const { data } = await api.get(`/geocommunities/${continent}/countries`)
      this.countries = data.body.map((item) => item.name)
    },
    async selectedCountry(event) {
      const country = event.target.value
      this.hiddenStates = false
      const { data } = await api.get(`/geocommunities/${country}/states`)
      this.states = data.body.map((item) => item.name)
    }
  }
}
</script>
