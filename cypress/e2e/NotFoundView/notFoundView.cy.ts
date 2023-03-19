const root = Cypress.config().baseUrl;

describe('Integration tests for the 404 not found page', () => {
  it('Clicking go back button takes you home if home was visited last', () => {
    cy.visit('/');
    cy.visit('/this-page-does-not-exist');
    cy.get('[data-testid="goBack"]').click();
    cy.url().should('eq', root);
  });

  it('Clicking go back button takes you to the last visited page', () => {
    cy.visit('/about');
    cy.visit('/this-page-does-not-exist');
    cy.get('[data-testid="goBack"]').click();
    cy.url().should('eq', root + 'about');
  });

  it('Clicking go home button takes you home', () => {
    cy.visit('/this-page-does-not-exist');
    cy.get('[data-testid="goHome"]').click();
    cy.url().should('eq', root);
  });

  it('Clicking go home button takes you home when last was about', () => {
    cy.visit('/about');
    cy.visit('/this-page-does-not-exist');
    cy.get('[data-testid="goHome"]').click();
    cy.url().should('eq', root);
  });
});
