// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SPA-Modus
  ssr: false,

  // CSS
  css: ['~/assets/css/main.css'],

  // Module
  modules: ['@nuxt/eslint'],

  // Nitro Storage für Unstorage
  nitro: {
    storage: {
      avatars: {
        driver: 'fs',
        base: './data/avatars',
      },
    },
  },
})
