<template lang="pug">
  nav(style="border:1px solid red" class="md:hidden").fixed.bottom-0.w-full.py-3.bg-white.text-xs
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
