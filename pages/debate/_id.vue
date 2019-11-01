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
    
    #detalles.border-t.border-b.border-gray-700.py-2.px-2
      p: strong Debate {{ debate.public?'público':'privado' }}
      p
        strong Tipo: 
        span {{ debate.type }}
      p
        strong Abierto: 
        span {{ debate.createdAt }}
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
      div(v-if="pdvs && pdvs.length > 0").flex.items-start.justify-center.flex-no-wrap
        .pdv(v-for="(pdv,i) in pdvs" :key="i").px-2
          h2.font-bold.py-3.text-center {{ pdv.name }}
          p.font-bold {{ pdv.cant_people }} personas
          .opinions.mt-2(v-for="(opinion,i) in opinions" :key="i")
            CardOpinion(
              :username="opinion.username",
              :avatar="avatar"
              :name="opinion.name",
              :lastname="opinion.lastname",
              :age="opinion.age",
              :points="opinion.points",
              :content="opinion.content",
              :date="opinion.date"
            ).color-card-opinion
        .px-2
          button(type="button").border.border-teal-600.bg-teal-500.font-bold.px-2.py-3.text-center.text-white.whitespace-no-wrap.w-64 Agregar columna
      form#opinion.mx-auto(v-else)
        .mt-2
          label.block.text-gray-700.text-md.font-bold.mb-1(for="title") Título
          input.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(
            class="focus:outline-none focus:shadow-outline"
            id="title"
            v-model="formOpinion.title"
            type="text"
            placeholder="Título del debate"
            maxlength="100"
          )
        .mt-2
          label(for="opinion").block.text-gray-700.text-md.font-bold.mb-1 Opinión
          textarea.shadow.appearance-none.border.rounded.w-full.py-2.px-3.leading-tight
</template>

<script>
import CardOpinion from '~/components/cards/opinion'
export default {
  name: 'DebateID',
  components: { CardOpinion },
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
          cant_people: 43
        },
        {
          name: 'PDV2',
          cant_people: 43
        }
      ],
      opinions: [
        {
          username: 'seba',
          avatar: '/sinfoto.png',
          name: 'Sebastian',
          lastname: 'Cardoso',
          age: '24',
          points: 53,
          content:
            'Lorem opsum dolor sit amet, consectetur adispiscing elit. Envenite, nesciunt quod alias repshenderit quae quia moillitia neque nam pariatur quidbusdam, optiom dolores animi libero delentini volipabius officiis dolor? Bladtitiis eius.',
          date: '15-Feb-2017'
        },
        {
          username: 'seba',
          avatar: '/sinfoto.png',
          name: 'Sebastian',
          lastname: 'Cardoso',
          age: 24,
          points: 53,
          content:
            'Lorem opsum dolor sit amet, consectetur adispiscing elit. Envenite, nesciunt quod alias repshenderit quae quia moillitia neque nam pariatur quidbusdam, optiom dolores animi libero delentini volipabius officiis dolor? Bladtitiis eius.',
          date: '15-Feb-2017'
        }
      ],
      formOpinion: {
        title: ''
      }
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
  }
}
</script>

<style lang="stylus" scoped>
violeta = #6F49A6
celeste = #2980b9
verde = #27ae60
amarillo = #f1c40f
naranja = #ff7f00
rojo = #ff0000
colors = violeta, celeste, verde, amarillo, naranja, rojo

#pdvs
  for color, i in colors
    .pdv:nth-child({i+1}) {
      color color
      h2 {
        background-color lighten(color, 80%)
        border: 2px solid color
      }
    }
    // BUG --> Cada pdv debería tener su color
    .color-card-opinion:nth-child({i+1}) {
      box-shadow: 0 0 5px color
    }
.pdv
  border-right 2px solid grey
  width:320px;
  @media screen and (min-width: 640px)
    width: 400px;
  @media screen and (min-width: 768px)
    width: 500px;

form#opinion {
  width: 320px;
}
</style>
