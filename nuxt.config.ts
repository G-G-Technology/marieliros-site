const isProd = process.env.NODE_ENV === 'production';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    buildAssetsDir: isProd ? '/_nuxt/' : '/',
    // baseURL: isProd ? '/marieliros-site/' : '/',
  },
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['~/assets/css/tailwind.css', '@/assets/css/main.css', '~/node_modules/primeicons/primeicons.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-viewport'],
});
