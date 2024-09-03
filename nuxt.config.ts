// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-mongoose",
    "@zadigetvoltaire/nuxt-gtm",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "./tailwind.config.ts",
  },
  gtm: {
    id: "GTM-WP8DL534",
  },
});
