import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: [],
  css: [
    "@/assets/css/tailwind.css",
    // font Awesome css
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  vite: {
    server: {
      proxy: {
        "^/api": {
          target: process.env.BACKENDURL || "http://localhost:3030",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
});
