<template lang="pug">
  section.mt-7.mx-auto
    .bg-gray-300
      div(v-if="debate.images")
        img(:src="debate.images").mx-auto
      div(v-else)
        img(src="/img/card.jpg").mx-auto
    h1.font-bold.text-4xl.text-center(class="md:text-5xl lg:text-6xl") {{ debate.title }}
    .my-4.px-4.text-gray-800.text-lg.mx-auto
      p {{ debate.description }}
    
    #detalles.border-t.border-b.border-gray-700.py-2
      p: strong Debate {{ debate.public?'público':'privado' }}
      p
        strong Tipo: 
        span {{ debate.type }}
      p
        strong Abierto: 
        span {{ dateFormatted }}
      p
        strong Comunidad: 
        span {{ debate.inGeopolitic.name }}
      p
        strong Creado por: 
        nuxt-link(:to="'/profile/'+debate.author.username") {{ debate.author.username }}
    
      .mt-2.text-center
        h4 Cantidad de caratecteres permitidos:
        .text-center.text-xl <small>Min: </small><strong>{{ debate.char_min }}</strong> - <small>Max: </small><strong>{{ debate.char_max }}</strong>
    
    h3.font-bold.my-2.text-3xl.text-center Puntos de vista
    
    //- Puntos de vista
    #pdvs.flex.overflow-x-auto
      .flex.items-center.justify-center.flex-no-wrap
        #pdv(v-for="(pdv,i) in pdvs" :key="i" style="width:300px").px-2
          h2.border.border-blue-600.font-bold.py-3.text-center {{ pdv.name }}
          p opiniones
</template>

<script>
export default {
  name: 'debateID',
  data() {
    return {
      algo: 'hola',
      pdvs: [
        {
          name: 'PDV1',
          cant_people: 23
        },
        {
          name: 'PDV2',
          cant_people: 54
        },
        {
          name: 'PDV3',
          cant_people: 43
        },
        {
          name: 'PDV4',
          cant_people: 23
        },
        {
          name: 'PDV5',
          cant_people: 54
        },
        {
          name: 'PDV6',
          cant_people: 43
        },
        {
          name: 'PDV7',
          cant_people: 43
        }
      ]
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const data = await $axios.$get(`/debate/${params.id}`)
      return {
        debate: data.body,
        erorr: data.error
      }
    } catch (e) {
      throw e
    }
  },
  computed: {
    dateFormatted() {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(this.debate.createdAt)
        .toLocaleString('es', options)
        .replace(/ /g, '-')
        .replace('.', '')
        .replace(/-([a-z])/, (x) => '-' + x[1].toUpperCase())
    }
  }
}
</script>

<style scoped>
#pdv {
  border-left: 2px solid grey;
}
</style>
