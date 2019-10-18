<template lang="pug">
  main.mt-10
    h2.text-3xl.text-center.w-full Selecciona tu comunidad
    form.max-w-3xl.px-2.mx-auto
      .label-group.px-2.mx-auto.my-10(v-for="(geopolitic, i) in geopolitics" :key="i" class="w-1/2 md:w-1/3 lg:w-1/4")
        label.block.text-gray-700.text-sm.font-bold.mb-1(for="description") {{ geopolitic.division }}
        v-select(
          class="focus:outline-none focus:bg-white focus:border-gray-500"
          :options="geopolitic.items"
          @input="selected"
          @search:focus="handleFocus(geopolitic.level)"
        )
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CommunitiesPage',
  data: () => ({
    onFocus: ''
  }),
  computed: {
    ...mapGetters({
      geopolitics: 'communities/geopoliticsBreadcrumbs'
    })
  },
  methods: {
    handleFocus(geopoliticLevel) {
      this.onFocus = geopoliticLevel
    },
    selected(value) {
      switch (this.onFocus) {
        case 0:
          this.$store.dispatch('communities/update_continent', value)
          break
        case 1:
          this.$store.dispatch('communities/update_country', value.label)
          break
        case 2:
          this.$store.dispatch('communities/update_state', value)
          break
      }
    }
  }
}
</script>
