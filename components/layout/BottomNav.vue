<template lang="pug">
  div(class="pb-12 md:p-0").absolute.bottom-0.z-40
    nav(style="border:1px solid blue" class="md:hidden").fixed.bottom-0.w-full.py-3.bg-white.text-xs.bg-white
      ul.flex.justify-around.items-center
        li
          nuxt-link(to="/statics") Estadísticas
        li
          nuxt-link(to="/debates") Debates
        li
          nuxt-link(to="/aims") Aims
        li
          nuxt-link(to="/communities") Comunidades
</template>
