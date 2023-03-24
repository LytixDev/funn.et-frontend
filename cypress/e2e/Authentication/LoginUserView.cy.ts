let apiUrl = Cypress.env('apiUrl');

describe('Test user using the login page', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.visit('/login');
  });

  it('Test user logging in saves a token in localstorage', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';
    cy.intercept('POST', `${apiUrl}api/v1/public/token`, {
      statusCode: 200,
      body: testToken,
    });
    cy.intercept('GET', `${apiUrl}api/v1/private/user/me`, {
      statusCode: 200,
      body: {
        id: 1,
        username: username,
        email: '',
        role: 'USER',
        firstName: '',
        lastName: '',
      },
    });

    cy.get('input[data-testid="username"]', { timeout: 60000 }).should('exist').type(username);
    cy.get('input[data-testid="password"]').type('testPassword123');
    cy.get('button[data-testid="login-user-button"]').click().wait(4000);
    cy.getCookie('userInfo')
      .should('have.property', 'value')
      .then((value) => {
        expect(value).to.include(testToken);
      });
  });
});
