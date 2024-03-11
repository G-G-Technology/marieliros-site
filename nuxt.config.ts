import path from 'path';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['./assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-primevue'],
  primevue: {
    options: {
      unstyled: true,
    },
    importPT: { as: 'Lara', from: path.resolve(__dirname, './presets/lara/') },
  },
});
