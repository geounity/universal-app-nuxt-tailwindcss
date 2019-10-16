<template lang="pug">
  .max-w-sm.w-full(class='lg:max-w-full lg:flex')
    .h-48.flex-none.bg-cover.rounded-t.text-center.overflow-hidden(class='lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l' style="background-image: url('img/card.jpg')" title='Man fly')
    .border-r.border-b.border-l.border-gray-400.bg-white.rounded-b.p-4.flex.flex-col.justify-between.leading-normal(class='lg:border-l-0 lg:border-t lg:border-gray-400 lg:rounded-b-none lg:rounded-r')
      .mb-8
        p.text-sm.text-gray-600.flex.items-center
          svg.fill-current.text-gray-500.w-5.h-5.mr-2(xmlns='http://www.w3.org/2000/svg' viewbox='0 0 20 20')
            path(d='M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z')
          | {{ public?'Publico':'Privado' }}
        .text-gray-900.font-bold.text-xl.my-2 {{ title }}
        p.text-gray-700.text-base
          | {{ description }}
      .flex.flex-wrap.items-center.justify-between
        div.flex.items-center(class="w-1/2 lg:w-1/3")
          img.w-10.h-10.rounded-full.mr-4(:src="author.photoURL?author.photoURL:'/sinfoto.png'" alt='Avatar of Jonathan Reinink')
          .text-sm
            p.text-gray-900.leading-none {{ author.username }}
            p.text-gray-600 {{ date }}
        .text-md.text-center(class="w-1/2 lg:w-1/3")
          p Comunidad:
          p: strong {{ community }}
        .text-sm.text-center.mt-4(class="w-full lg:w-1/3 lg:mt-0 lg:text-left")
          p
            span Caracteres mínimos permitidos:
            strong.text-lg.text-center.ml-2 {{ charmin }}
          p
            span Caracteres máximos permitidos:
            strong.text-lg.text-center.ml-2 {{ charmax }}
        
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CardDebate',
  props: {
    public: { type: Boolean, default: true },
    title: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    author: { type: Object, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    charmin: { type: Number, required: true },
    charmax: { type: Number, required: true },
    community: { type: String, required: true }
  },
  computed: {
    ...mapGetters({
      avatar: 'users/avatar',
      username: 'users/username'
    })
  }
}
</script>
