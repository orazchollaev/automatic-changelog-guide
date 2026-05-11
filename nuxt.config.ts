import pkg from "./package.json"

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/content", "@nuxt/eslint"],
  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },

  runtimeConfig: {
    public: {
      appVersion: pkg.version,
    },
  },

  vite: {
    optimizeDeps: {
      include: ["@nuxtjs/mdc"],
    },
  },

  css: ["@/assets/style/index.css"],

  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@300;400;500&display=swap",
        },
      ],
    },
  },

  content: {
    highlight: {
      themes: {
        light: "github-dark",
        dark: "github-dark",
      },
    },
  },
})
