<template lang="pug">
  main
    h1.text-3xl.font-bold.text-center.mt-6 Abrir un debate
    form(method="post").max-w-3xl.px-2.mx-auto
      .mt-4
        label.block.text-gray-700.text-sm.font-bold.mb-2(for="title") Título
        input.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight(
          class="focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Título del debate"
        )
      .mt-4
        label.block.text-gray-700.text-sm.font-bold.mb-2(for="description") Descripción
        textarea.shadow.appearance-none.border.rounded.w-full.py-2.px-3.text-gray-700.leading-tight.h-20(
          class="focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          placeholder="Una descripción del problema. Se objetivo. Luego de abrir el debate podrás dar tu punto de vista."
        )
      .mt-4.flex.flex-wrap
        label.w-full.block.text-gray-700.text-sm.font-bold.mb-2(for="description") Comunidad que participará
        
        div(class="w-1/2 md:w-1/3 lg:w-1/4").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-2(for="description") Continentes
          select.block.w-full.bg-gray-200.border.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.rounded.leading-tight(class="focus:outline-none focus:bg-white focus:border-gray-500" id="grid-continent")
            option Global
            option Africa
            option Asia
            option Americas
            option Europa
            option Oceania
        div(class="w-1/2 md:w-1/3 lg:w-1/4").px-2
          label.block.text-gray-700.text-sm.font-bold.mb-2(for="description") Paises
          select.block.w-full.bg-gray-200.border.border.border-gray-200.text-gray-700.py-3.px-4.pr-8.rounded.leading-tight(class="focus:outline-none focus:bg-white focus:border-gray-500" id="grid-continent" disabled)
            option Depende
            option del
            option Continente
            option Seleccionado
            option Oceania
      .mt-4
        button.mt-5.bg-teal-500.text-white.font-bold.py-2.px-4.rounded.w-full Abrir debate
</template>
