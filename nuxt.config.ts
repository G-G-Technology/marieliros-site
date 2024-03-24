// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    static: true,
    prerender: {
      // Workaround for "Error: [404] Page not found: /manifest.json"
      failOnError: false,
    },
  },
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['./assets/css/tailwind.css', '@/assets/css/main.css', 'primeicons/primeicons.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
});
