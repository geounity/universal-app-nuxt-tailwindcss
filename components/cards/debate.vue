<template lang="pug">
  .max-w-5xl.w-full.mt-4(class='lg:flex')
    .h-48.bg-cover.bg-center.rounded-t.text-center(class='lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l' style="background-image: url('img/card.jpg')" title='Man fly')
    .border-r.border-b.border-l.border-gray-400.bg-white.rounded-b.p-2.leading-normal(class='lg:border-l-0 lg:border-t lg:rounded-b-none lg:rounded-r')
      .mb-4
        p.text-xs.text-gray-600.flex.items-center
          svg.fill-current.text-gray-500.w-5.h-5.mr-2.mb-1(xmlns='http://www.w3.org/2000/svg' viewbox='0 0 20 20')
            path(d='M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z')
          | {{ public?'Publico':'Privado' }}
        nuxt-link(:to="`/${id}`").text-gray-900.font-black.text-2xl.my-2 {{ title }}
        nuxt-link(:to="`/${id}`")
          p.text-gray-700.text-base
            | {{ description }}
      .flex.flex-wrap.justify-between.items-center
        .text-sm.text-center.mb-4(class="w-full lg:w-1/3 lg:mt-0 lg:text-left")
          p
            span Caracteres mínimos permitidos:
            strong.text-lg.text-center.ml-2 {{ charmin }}
          p
            span Caracteres máximos permitidos:
            strong.text-lg.text-center.ml-2 {{ charmax }}
        .flex.items-center(class="w-1/2 lg:w-1/3")
          img.w-10.h-10.rounded-full.mr-3(:src="author.photo?author.photo:'/sinfoto.png'" :alt="'Avatar de '+author.username")
          .text-sm
            nuxt-link(:to="'/profile/'+author.username").text-gray-900.leading-none {{ author.username }}
            p.text-gray-600 {{ dateFormated }}
        .text-right(class="w-1/2 lg:w-1/3")
          p {{ community }}
        
</template>

<script>
import { mapGetters } from 'vuex'

// function formatDate(date) {
//   const monthNames = [
//     "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
//   ]
//   const day = getDate()
// }
export default {
  name: 'CardDebate',
  props: {
    id: { type: Number, required: true },
    public: { type: Boolean, default: true },
    title: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    author: { type: Object, required: true },
    date: { type: String, required: true },
    type: { type: String, required: true },
    charmin: { type: Number, required: true },
    charmax: { type: Number, required: true },
    community: { type: String, required: true }
  },
  computed: {
    ...mapGetters({
      avatar: 'users/avatar',
      username: 'users/username'
    }),
    geopoliticName() {
      return 'Buenos Aires'
    },
    dateFormated() {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(this.date)
        .toLocaleString('es', options)
        .replace(/ /g, '-')
        .replace('.', '')
        .replace(/-([a-z])/, (x) => '-' + x[1].toUpperCase())
    }
  }
}
</script>
