import fs from 'fs';
import path from 'path';

const envObj = {
  get (envName) {
    return envObj.defind[envName];
  },
  defind: {
    dev: {
      env: 'local',
      apiPath: 'https://sit-api.mobii.ai/campaign/api/v1',
      mobii: 'https://sit.mobii.ai',
      domain: 'https://192.168.58.131:8083',
      GA: 'GTM-N22PP3B',
      host: '0.0.0.0',
      port: 8083,
      key: 'server_mobii_202101.key',
      cert: 'mobii_20210112.pem',
      version: 'web.1.3.9_0222'
    },
    sit: {
      env: 'sit',
      apiPath: 'https://sit-api.mobii.ai/campaign/api/v1',
      mobii: 'https://sit.mobii.ai',
      domain: 'https://sit-events.mobii.ai',
      GA: 'GTM-N22PP3B',
      host: '172.31.15.223',
      port: 8081,
      key: '/etc/pki/eyesmedia/server_mobii_202101.key',
      cert: '/etc/pki/eyesmedia/mobii_20210112.pem',
      version: 'web.1.3.9_0222'
    },
    uat: {
      env: 'uat',
      apiPath: 'https://uat-api.mobii.ai/campaign/api/v1',
      mobii: 'https://www-uat.mobii.ai',
      domain: 'https://uat-events.mobii.ai',
      GA: 'GTM-N22PP3B',
      host: '10.255.1.130',
      port: 8081,
      key: '/etc/pki/eyesmedia/server_mobii_202101.key',
      cert: '/etc/pki/eyesmedia/mobii_20210112.pem',
      version: 'web.1.3.9_0222'
    },
    prod: {
      env: 'prod',
      apiPath: 'https://api.mobii.ai/campaign/api/v1',
      mobii: 'https://mobii.ai',
      domain: 'https://event.mobii.ai',
      GA: 'GTM-KBZ2VT8',
      host: '210.65.10.85',
      port: 8080,
      key: '/etc/pki/eyesmedia/server_mobii_202101.key',
      cert: '/etc/pki/eyesmedia/mobii_20210112.pem',
      version: 'web.1.3.9_0222'
    },
    prod2: {
      env: 'prod2',
      apiPath: 'https://api.mobii.ai/campaign/api/v1',
      mobii: 'https://mobii.ai',
      domain: 'https://event.mobii.ai',
      GA: 'GTM-KBZ2VT8',
      host: '210.65.47.3',
      port: 8080,
      key: '/etc/pki/eyesmedia/server_mobii_202101.key',
      cert: '/etc/pki/eyesmedia/mobii_20210112.pem',
      version: 'web.1.3.9_0222'
    }

  }
};

export default {
  mode: 'universal', // spa or universal

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'eyesmedia-mobii-campaign-ui',
    htmlAttrs: {
      lang: 'zh-Hant-TW'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      // { hid: 'description', name: 'description', content: '' }
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
    scss: ['@/assets/styles/*.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    '~/plugins/gtm',
    { src: '~/plugins/vue-lazyload' },
    { src: '~/plugins/vue-linkify', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components/campaign',
      '~/components/shared'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/moment',
    '@nuxtjs/style-resources'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['cookie-universal-nuxt', { parseJSON: false }],
    '@nuxtjs/gtm',
    '@nuxtjs/google-gtag',
    '@nuxtjs/robots',
    'nuxt-material-design-icons-iconfont',
    [
      '@nuxtjs/recaptcha', {
        /* reCAPTCHA options */
        hideBadge: true,
        size: 'normal',
        language: 'zh-TW',
        version: 2,
        siteKey: '6LcrBtocAAAAAAFzxAklbyhTX-pmtxnb-aNgMIQH'
      }
    ]
  ],
  gtm: {
    id: envObj.get(process.env.SIDE_ENV).GA,
    enabled: true,
    pageTracking: true,
    autoInit: true
  },
  'google-gtag': {
    id: envObj.get(process.env.SIDE_ENV).GA,
    debug: process.env.NODE_ENV !== 'production',
    disableAutoPageTrack: false,
    config: {
      anonymize_ip: true,
      send_page_view: false // 避免頁面刷新時後的重複追蹤
    }
  },

  googleAnalytics: {
    id: envObj.get(process.env.SIDE_ENV).GA,
    debug: {
      enabled: process.env.NODE_ENV !== 'production',
      sendHitTask: true
    }
  },

  /** robots
   * UserAgent  搜尋引擎類型
   * Disallow   設定不能被讀取的路徑, 如登入後的使用者相關資料頁面路徑不可被爬 /user
  */
  robots: [{
    UserAgent: '*', // any robot
    Disallow: ['/gui']
  }, {
    UserAgent: 'Googlebot', // all Google services
    Disallow: ['/gui']
  }],

  publicRuntimeConfig: {
    gtm: {
      id: envObj.get(process.env.SIDE_ENV).GA,
      enabled: true,
      pageTracking: true,
      autoInit: true
    },
    googleAnalytics: {
      id: envObj.get(process.env.SIDE_ENV).GA
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
    //,
    // 修改公用路徑，默認值'/_nuxt/'
    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#publicpath
    // publicPath: 'lynn/'
  },

  dev: process.env.NODE_ENV !== 'production',

  env: {
    SIDE_ENV: envObj.get(process.env.SIDE_ENV)
  },

  server: {
    /** https憑證設定
     * 注意: server_mobii_202101.key 與 mobii_20210112.pem 有時效性,
     * 當過期之後需找網管人員提供.
    */
    https: {
      key: fs.readFileSync(path.resolve(__dirname, envObj.get(process.env.SIDE_ENV).key)),
      cert: fs.readFileSync(path.resolve(__dirname, envObj.get(process.env.SIDE_ENV).cert))
    },
    // port: 8083, // default: 3000
    port: envObj.get(process.env.SIDE_ENV).port,
    // host: '0.0.0.0' // default: localhost  // 210.65.10.85
    host: envObj.get(process.env.SIDE_ENV).host
  }
};
