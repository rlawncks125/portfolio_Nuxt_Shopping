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

  // vite: {
  //   server: {
  //     proxy: {
  //       "^/api": {
  //         target: "https://myapi.kimjuchan97.site",
  //         changeOrigin: true,
  //         rewrite: (path) => path.replace(/^\/api/, ""),
  //       },
  //     },
  //   },
  // },

  // 앱에서 사용하는 환경변수 설정
  // https://v3.nuxtjs.org/migration/runtime-config#runtime-config
  runtimeConfig: {
    //  // 서버에서만 사용할 수 있는 개인 구성
    //  apiSecret: '123',
    //  // 공용 내의 구성도 클라이언트에 노출됩니다.
    //  public: {
    //    apiBase: '/api'
    //  }
    public: {
      apiServer: process.env.APISERVER || "http://localhost:3030",
    },
  },
});

// runtimeConfig 타입 정의
declare module "@nuxt/schema" {
  // interface RuntimeConfig {
  //     apiBase: string
  // }
  interface PublicRuntimeConfig {
    apiServer: string;
  }
}
