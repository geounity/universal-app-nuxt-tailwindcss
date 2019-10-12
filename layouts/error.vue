<template lang="pug">
  .container.flex.flex-col
    img(v-if="error.statusCode===404" src="/404.svg" class="md:w-2/3")
    h1.text-xl.text-center.font-bold.mt-6 {{error.message}}
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: '',
        message: ''
      })
    }
  }
}
</script>
