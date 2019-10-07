<template lang="pug">
  nav.flex.items-center.justify-between.bg-teal-500.p-6
    div.flex-items-center.flex-shrink-0.text-white.nr-6
      nuxt-link(to="/"): span.font-semibold.text-xl.tracking-tight Geounity
    div.flex(class="lg:items-center lg:w-auto")
      div.text-sm.hidden(class="lg:flex lg:flex-grow")
        nuxt-link(to="/statics" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4") Estadísticas
        nuxt-link(to="/debates" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4") Debates
        nuxt-link(to="/aims" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4") Propuestas
        nuxt-link(to="/communities" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4") Comunidades
      div
        nuxt-link(to="login" class="inline-block text-sm px-4 py-2 ml-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0") Iniciar sesión
        nuxt-link(to="signup" class="inline-block text-sm px-4 py-2 ml-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0") Registrarse
</template>
