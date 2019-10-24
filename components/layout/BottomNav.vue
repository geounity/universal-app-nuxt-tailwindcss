<template lang="pug">
  div(class="pb-12 md:p-0").absolute.bottom-0.z-40
    nav(class="md:hidden").border-t-2.border-gray-400.fixed.bottom-0.w-full.pt-1.bg-white.text-sm.bg-white
      ul.flex.font-bold.justify-around.items-center.text-gray-700
        nuxt-link(tag="li" to="/statics")
          img(src="/menu-nav/statics.svg").h-5.w-5.mx-auto
          span Estadísticas
        nuxt-link(tag="li" to="/debates")
          img(src="/menu-nav/debates.svg").h-5.w-5.mx-auto
          span Debates
        nuxt-link(tag="li" to="/aims")
          img(src="/menu-nav/aims.svg").h-5.w-5.mx-auto
          span Propuestas
        nuxt-link(tag="li" to="/communities")
          img(src="/menu-nav/communities.svg").h-5.w-5.mx-auto
          span Comunidades
</template>
