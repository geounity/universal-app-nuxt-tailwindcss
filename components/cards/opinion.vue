<template lang="pug">
  div#card-opinion.p-1.mb-2.rounded.text-left
    header.flex.justify-between
      div.flex.items-center
        img(:src="avatar").h-12.w-12.mr-1.rounded-full
        div.leading-none
          p
            span.font-bold.text-xl.text-lg.mr-1 {{ username }}
            span.text-sm.text-gray-700(v-if="show_name") ({{ name }} {{ lastname }})
          p.text-sm.text-gray-700 {{ service }}
          p.text-sm.text-gray-700(v-if="show_age") {{ yearsOld }} años
      strong +{{ points }}
    main.leading-snug.text-gray-900.px-1.py-3
      p {{ content }}
    footer
      p {{ dateFormatted }}
</template>

<script>
export default {
  name: 'CardOpinion',
  props: {
    username: { type: String, required: true },
    avatar: { type: String, required: false, default: '/sinfoto.png' },
    name: { type: String, requred: false, default: '' },
    lastname: { type: String, requred: false, default: '' },
    service: { type: String, required: false, default: '' },
    datebirth: { type: String, required: false, default: '' },
    show_name: { type: Boolean, required: true },
    show_age: { type: Boolean, required: true },
    points: { type: Number, required: false, default: 0 },
    content: { type: String, required: true },
    date: { type: Date, required: true }
  },
  data() {
    return {}
  },
  computed: {
    dateFormatted() {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(this.date)
        .toLocaleString('es', options)
        .replace(/ /g, '-')
        .replace('.', '')
        .replace(/-([a-z])/, (x) => '-' + x[1].toUpperCase())
    },
    yearsOld() {
      const today = new Date()
      const birthDate = new Date(this.datebirth)
      let yearsOld = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        yearsOld--
      }
      return yearsOld
    }
  }
}
</script>

<style scoped>
#card-opinion {
  border: 1px solid gray;
  min-width: 320px;
  max-width: 500px;
}
</style>
