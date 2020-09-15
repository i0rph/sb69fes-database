import axios from 'axios'

require('dotenv').config()

module.exports = {
  mode: 'universal',
  router: {
    base: '/',
    linkExactActiveClass: 'active',
    middleware: ['ssr-cookie']
  },
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:type', name: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&display=swap'},
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css', integrity: "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/", crossorigin: "anonymous"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',

  /*
  ** Global CSS
  */
  css: [
    'assets/css/nucleo/css/nucleo.css',
    'assets/sass/argon.scss',
    'plyr/dist/plyr.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/dashboard/dashboard-plugin',
    '~/node_modules/vanilla-back-to-top',
    {src: '~/plugins/vuexStorage', ssr: false},
    {src: '~/plugins/dashboard/no-ssr-plugins', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      locales: [
        {
          name: '한국어',
          code: 'ko',
          iso: 'ko-KR',
          file: 'ko-KR.js'
        },
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js'
        }
      ],
      vuex: {
        moduleName: 'i18n',
        syncLocale: true,
        syncMessages: true,
        syncRouteParams: true
      },
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'en'
    }],
    '@nuxtjs/sentry',
    ['@nuxtjs/google-analytics', {
      id: 'UA-148921044-4'
    }],
    '@nuxtjs/sitemap'
  ],
  sentry: {
    disabled: process.env.NODE_ENV !== 'production',
    config: {
      environment: process.env.SENTRY_ENV,
      disabled: process.env.NODE_ENV !== 'production'
    }
  },
  sitemap: {
    hostname: `https://${process.env.DOMAIN}`,
    gzip: true,
    exclude: [
      '/user/**'
    ],
    routes: async () => {
      let routes = []

      const bromide = await axios.get('https://db.showbyrock.net/api/bromide')
      const comic = await axios.get('https://db.showbyrock.net/api/comic')
      const event = await axios.get('https://db.showbyrock.net/api/event')
      const music = await axios.get('https://db.showbyrock.net/api/music')

      routes = [
        ...bromide.data.map(b => `/bromide/${b.id}`),
        ...bromide.data.map(b => `/ko/bromide/${b.id}`),
        ...comic.data.map(c => `/comic/${c.id}`),
        ...comic.data.map(c => `/ko/comic/${c.id}`),
        ...event.data.map(e => `/event/${e.id}`),
        ...event.data.map(e => `/ko/event/${e.id}`),
        ...music.data.map(m => `/music/${m.id}`),
        ...music.data.map(m => `/ko/music/${m.id}`)
      ]
      
      return routes
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx && ctx.isClient) config.optimization.splitChunks.maxSize = 51200
    },
    filenames: {  
      app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',  
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js' 
    },
    extractCSS: process.env.NODE_ENV === 'production',
    babel: {
      plugins: [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    }
  },
  serverMiddleware: [ '~/api' ],
  server: { port: 1000 }
}
