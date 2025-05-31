import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1024,
  viewportHeight: 768,
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
