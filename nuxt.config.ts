// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SPA-Modus
  ssr: false,

  // App Head
  app: {
    head: {
      title: 'Avatar Generator',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // Module
  modules: ['@nuxt/eslint'],

  // Nitro Storage für Unstorage
  nitro: {
    storage: {
      avatars: {
        driver: 's3',
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
        endpoint: 'https://sos-at-vie-1.exo.io',
        bucket: 'avatar',
        region: 'at-vie-1',
      },
    },
  },
})
