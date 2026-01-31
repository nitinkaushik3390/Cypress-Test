const { defineConfig } = require("cypress");


module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',

  video: false,

  reporterOptions: {

    charts: true,

    reportPageTitle: 'Cypress Inline Reporter',

    embeddedScreenshots: true, 

    inlineAssets: true, //Adds the asserts inline

  },


  e2e: {

    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);
      require('cypress-terminal-report/src/installLogsPrinter')(on);

    },

    baseUrl: "http://100.27.30.112/api",

  },

});