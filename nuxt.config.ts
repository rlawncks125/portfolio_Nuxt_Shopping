import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // target: "static",

  buildModules: ["@pinia/nuxt"],
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

    // transpile : ['swiper']
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
      apiServer:
        process.env.APISERVER || "https://juchan-back-server.herokuapp.com",
      impCodeApi: "imp85605338",
      reCAPTCHA_SITE_KEY:
        process.env.reCAPTCHA_SITE_KEY ||
        "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
    },
    reCAPTCHA_SECRET_KEY:
      process.env.reCAPTCHA_SECRET_KEY ||
      "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe",
  },

  meta: {
    script: [
      // jquery
      {
        src: "https://code.jquery.com/jquery-1.12.4.min.js",
        type: "text/javascript",
      },
      // iamport
      {
        src: "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js",
        type: "text/javascript",
      },
      // 다음 우편번호 서비스
      {
        src:
          "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js",
        type: "text/javascript",
      },
      // reCAPTCHA
      {
        src: "https://www.google.com/recaptcha/api.js",
        type: "text/javascript",
      },
    ],
  },
});

// runtimeConfig 타입 정의
declare module "@nuxt/schema" {
  interface RuntimeConfig {
    //     apiBase: string
    reCAPTCHA_SECRET_KEY: string;
  }
  interface PublicRuntimeConfig {
    apiServer: string;
    impCodeApi: string;
    reCAPTCHA_SITE_KEY: string;
  }
}
