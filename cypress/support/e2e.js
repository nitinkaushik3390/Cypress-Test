// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';
afterEach(() => {
    cy.wait(50, { log: false }).then(() =>
       cy.addTestContext({
          title: "Execution log",
          value: Cypress.TerminalReport.getLogs("txt")
                .replaceAll("(K): ", "(❌): "),
       })
    )
 });
const options_log_collector = {
    collectTypes: ["cons:warn", "cons:error", "cy:log"],
};
require('cypress-terminal-report/src/installLogsCollector')(options_log_collector);

// Alternatively you can use CommonJS syntax:
// require('./commands')