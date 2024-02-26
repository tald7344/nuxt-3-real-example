import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({
  ssr: false,       // must use this ssr: false with form vee-validate
  modules: ['nuxt-swiper'],
  css: [
    "@/assets/styles/scss/custom.scss",
    '@fortawesome/fontawesome-svg-core/styles.css',
    'awesome-notifications/dist/style.css',
  ],
  app: {
    head: {
      title: 'Nuxt 3',
      htmlAttrs: {
        lang: "en",
      },
      meta: [
          { charset: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { name: "description", content: "Ecommerce Site" },
        ],
        link: [
          {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
          },
          {
            rel: "stylesheet",
            href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
          },
          { 
            rel: 'icon', 
            href: '/icons/sm-white-logo.png', 
            type: "image/x-icon" 
          }
        ],
        script: [        
          { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" },
        ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/admin-api',
      apiImageUrl: 'http://localhost:8000/storage/',
      api: {
        AuthLoginApi: '/login',
        ProductsApi: '/products',
      }
    }
  },
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ]
  }
})
