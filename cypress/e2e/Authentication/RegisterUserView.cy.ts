apiUrl = Cypress.env('apiUrl');

describe('Test user using the register page', () => {
  beforeEach(() => {
    cy.once('uncaught:exception', () => false);
    cy.clearAllCookies();
    cy.visit('/register');
  });

  it('Test user registering saves a token in localstorage', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'newRegisteredUser';
    const firstName = 'my name';
    const lastName = 'my last name';
    const email = `${username}@example.com`;
    const password = 'testPassword123';
    cy.intercept('POST', `${apiUrl}api/v1/public/token`, {
      statusCode: 201,
      body: testToken,
    });
    cy.intercept('POST', `${apiUrl}api/v1/public/user`, {
      statusCode: 201,
    });
    cy.intercept('GET', `${apiUrl}api/v1/private/user/me`, {
      statusCode: 200,
      body: { username: username, firstName: firstName, lastName: lastName, email: email, roles: ['user'] },
    });

    cy.get('input[data-testid="username"]', { timeout: 60000 }).should('exist').type(username);
    cy.get('input[data-testid="email"]').type(email);
    cy.get('input[data-testid="first-name"]').type(firstName);
    cy.get('input[data-testid="last-name"]').type(lastName);
    cy.get('input[data-testid="password"]').type(password);
    cy.get('input[data-testid="repeat-password"]').type(password);
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
