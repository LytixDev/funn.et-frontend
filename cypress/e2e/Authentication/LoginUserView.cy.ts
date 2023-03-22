let apiUrl = Cypress.env('apiUrl');

describe('Test user using the login page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/login');
  });

  it('Test user logging in saves a token in localstorage', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';
    cy.intercept('POST', `${apiUrl}api/v1/public/token`, {
      statusCode: 200,
      body: testToken,
    });

    cy.get('input[data-testid="username"]', { timeout: 60000 }).should('exist').type(username);
    cy.get('input[data-testid="password"]').type('testPassword123');
    cy.get('button[data-testid="login-user-button"]').click();
    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({
        'http://localhost:4173': {
          token: testToken,
          username: username,
        },
      });
    });
  });
});
