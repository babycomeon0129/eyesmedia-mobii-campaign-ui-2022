const envObj = {
  get (envName) {
    return envObj.defind[envName];
  },
  defind: {
    dev: {
      apiPath: 'sit.lucas.com/api/v1',
      GA: '',
      host: '0.0.0.0'
    },
    sit: {
      apiPath: 'sit1.lucas.com/api/v1',
      GA: 'UA-145003593-1',
      host: '0.0.0.0'
    },
    biz: {
      apiPath: 'biz.lucas.com/api/v1',
      GA: 'UA-145003593-6',
      host: '210.65.10.85'
    }
  }
};

// console.log(`環境：${process.env.NODE_ENV}`);
// console.log(`配置API位置：${process.env.BASE}`);

export default {
  mode: 'universal', // spa or universal

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'eyesmedia-activity-module',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/_global',
    'swiper/swiper-bundle.css',
    'swiper/swiper.scss'
  ],

  // 改變nuxtjs預設的加載進度條
  loading: {
    color: '#2f68bf',
    height: '2px'
  },

  // 全域的scss檔
  styleResources: {
    scss: [
      // '~/assets/scss/variables.scss',
      // '~/assets/scss/common.scss',
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['cookie-universal-nuxt', { parseJSON: false }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  proxy: {
    api: {
      target: 'http://54.150.124.230:38086/api/Home',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],

    assetFilter (assetFilename) {
      return assetFilename.endsWith('.js');
    },

    // html壓縮與最小化
    html: {
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: false,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeAttributeQuotes: false,
        removeComments: false,
        removeEmptyAttributes: true,
        removeOptionalTags: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        removeTagWhitespace: false,
        sortClassName: false,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  },

  dev: process.env.NODE_ENV !== 'production',

  env: {
    SIDE_ENV: envObj.get(process.env.SIDE_ENV)
  },

  server: {
    port: 8083, // default: 3000
    // host: '0.0.0.0' // default: localhost  // 210.65.10.85
    host: envObj.get(process.env.SIDE_ENV).host
  }
};
