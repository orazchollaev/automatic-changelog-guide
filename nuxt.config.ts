// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint"],
  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },
})
