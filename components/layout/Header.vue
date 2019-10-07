<template lang="pug">
  nav.flex.items-center.justify-between.bg-teal-500.p-6
    div.flex-items-center.flex-shrink-0.text-white.nr-6
      nuxt-link(to="/"): span.font-semibold.text-xl.tracking-tight Geounity
    div.block(lg:flex lg:items-center lg:w-auto)
      div.text-sm(lg:flex-grow)
        nuxt-link(to="/statics" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4") Statics
        nuxt-link(to="/debates" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4") Debates
        nuxt-link(to="/aims" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4") Aims
        nuxt-link(to="/communities" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4") Communities
</template>
