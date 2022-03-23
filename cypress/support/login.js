Cypress.Commands.add("login", (username, password) => {
  // POST 200 https://www.google.com/recaptcha/api2/userverify?k=6LdSmG4cAAAAAOarRxGIhehvv4sPgVeF-vRi-Jqb

  cy.visit(Cypress.env("prenota_url"));
  //login
  cy.log("Login...");
  cy.typeNotLog("[name=Email]", username);
  cy.typeNotLog("[name=Password]", password);
  cy.clickNotLog("button[type=submit]");
});
