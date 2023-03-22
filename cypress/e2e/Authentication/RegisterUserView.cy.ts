apiUrl = Cypress.env('apiUrl');

describe('Test user using the register page', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.visit('/register');
  });

  it('Test user registering saves a token in localstorage', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'newRegisteredUser';
    cy.intercept('POST', `${apiUrl}api/v1/public/token`, {
      statusCode: 201,
      body: testToken,
    });
    cy.intercept('POST', `${apiUrl}api/v1/public/user`, {
      statusCode: 201,
    });

    cy.get('input[data-testid="username"]', { timeout: 60000 }).should('exist').type(username);
    cy.get('input[data-testid="email"]').type(`${username}@example.com`);
    cy.get('input[data-testid="first-name"]').type('my name');
    cy.get('input[data-testid="last-name"]').type('my last name');
    cy.get('input[data-testid="password"]').type('testPassword123');
    cy.get('button[data-testid="create-user-button"]').click().wait(1000);
    cy.getCookie('userInfo')
      .should('have.property', 'value')
      .then((value) => {
        expect(value).to.include(testToken);
      });
  });

  it('Test user registering with username that already exists shows error box', () => {
    const username = 'newRegisteredUser';
    cy.intercept('POST', `${apiUrl}api/v1/public/token`, {
      statusCode: 201,
      body: 'TestTokenFromMockBackend',
    });
    cy.intercept('POST', `${apiUrl}api/v1/public/user`, {
      statusCode: 409,
    });

    cy.get('input[data-testid="username"]', { timeout: 60000 }).should('exist').type(username);
    cy.get('input[data-testid="email"]').type(`${username}@example.com`);
    cy.get('input[data-testid="first-name"]').type('my name');
    cy.get('input[data-testid="last-name"]').type('my last name');
    cy.get('input[data-testid="password"]').type('testPassword123');
    cy.get('button[data-testid="create-user-button"]').click().wait(1000);
    cy.getAllCookies().then((result) => {
      expect(result).to.deep.equal([]);
    });
  });
});
