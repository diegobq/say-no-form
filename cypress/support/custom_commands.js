const noLog = { log: false };

Cypress.Commands.add("getNotLog", (selector) => {
  cy.get(selector, noLog);
});

Cypress.Commands.add("typeNotLog", (selector, text) => {
  cy.getNotLog(selector).type(text, noLog);
});

Cypress.Commands.add("clickNotLog", (selector) => {
  cy.getNotLog(selector).click(noLog);
});

Cypress.Commands.add("uploadFile", (selector, filePath) => {
  cy.getNotLog(selector).click(noLog);
});
