const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 60000,
  e2e: {
    baseUrl:'https://ddmrp.veaser.com.br',
  },
  viewportWidth: 1200,
  viewportHeight: 990,
});
