// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    static: true,
  },
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['~/assets/css/tailwind.css', '@/assets/css/main.css', 'primeicons/primeicons.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
});
