module.exports = {
  server: {
    host: '0.0.0.0'
  },
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Geounity',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios'
    // '~/plugins/firebase.js'
  ],
  /**
   ** Router settings
   */
  router: {
    middleware: ['authenticated']
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', 'nuxt-vue-select'],
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:8080'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
