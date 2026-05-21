// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css', 'primeicons/primeicons.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-viewport', '@nuxtjs/sitemap', 'nuxt-auth-utils'],
  components: [{ path: '~/components', pathPrefix: false }],
  runtimeConfig: {
    session: {
      password: '', // overridden at runtime by NUXT_SESSION_PASSWORD env var
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  image: {
    cloudinary: {
      baseURL: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`,
    },
  },
  site: {
    url: 'https://marieliros.com.br',
  },
  sitemap: {
    exclude: ['/admin/**'],
  },
});
