<template lang="pug">
  .max-w-sm.mx-auto.my-4.overflow-hidden.rounded.shadow-lg(class="sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl")
    img(src="/img/card.jpg" alt="Imagen del debate").h-auto.w-full
    .px-2.pt-4
      nuxt-link(:to="`${community}/debate/${id}`")
        .font-bold.mb-2.text-xl(class="md:text-2xl xl:text-3xl") {{ title }}
        p.mb-4.text-sm.text-gray-700(class="md:text-md xl:text-lg") {{ description }}
      .flex.items-center.justify-between.mb-2
        .flex.items-center
          img(:src="author.photo?author.photo:'/sinfoto.png'" :alt="'Avatar de ' + author.username").h-10.w-10.rounded-full.mr-2
          .text-sm.leading-tight
            nuxt-link(:to="'/profile/'+author.username").text-gray-900.leading-none {{ author.username }}
            p.text-gray-600 {{ dateFormatted }}
        .text-right
          nuxt-link(to="/"): span.text-blue-500 {{ community }}
      div.bg-gray-200.leading-tight.text-sm.py-1(class="lg:text-md")
        h4.text-center Caracteres permitidos para opinar:
        .text-center <strong>Min:</strong><i>{{ charmin }}</i> - <strong>Max:</strong><i>{{ charmax }}</i>
        
</template>

<script>
import { mapGetters } from 'vuex'

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
    dateFormatted() {
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
