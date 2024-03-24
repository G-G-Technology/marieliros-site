// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/_nuxt/',
  },
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['~/assets/css/tailwind.css', '@/assets/css/main.css', '~/node_modules/primeicons/primeicons.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
});
