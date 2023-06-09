apiUrl = Cypress.env('apiUrl');

describe('Test user using the login page', () => {
  beforeEach(() => {
    cy.intercept('GET', `${apiUrl}api/v1/public/categories`, {
      statusCode: 200,
      body: [{ id: 0, name: 'All' }],
    });
    cy.wait(1000);
  });

  it('Test logged in user gets localstorage cleared', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';

    cy.setCookie('userInfo', JSON.stringify({ accessToken: testToken, username: username, role: 'USER' }));
    cy.visit('/signout').wait(5000);

    cy.getCookie('userInfo')
      .should('have.property', 'value')
      .then((value) => {
        expect(value).to.not.include(testToken).and.to.not.include(username);
      });
  });

  it('Test not logged out user gets no effect from signout', () => {
    cy.getAllCookies().then((result) => {
      expect(result).to.deep.equal([]);
    });

    cy.visit('/signout').wait(4000);

    cy.getAllCookies().then((result) => {
      expect(result).to.deep.equal([]);
    });
  });
});
