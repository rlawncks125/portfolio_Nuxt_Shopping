const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // baseUrl: "http://localhost:3000/",
    baseUrl: "https://nuxt-shop.kimjuchan97.xyz",
    component: {
      devServer: {
        framework: "nuxt",
        bundler: "webpack",
      },
    },
    // cors 문제 무시
    chromeWebSecurity: false,
  },
});
