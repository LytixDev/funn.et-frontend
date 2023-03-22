describe('Test user using the login page', () => {
  it('Test logged in user gets localstorage cleared', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';

    cy.visit('/signout', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('token', testToken);
        win.localStorage.setItem('username', username);
      },
    }).wait(1000);

    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({});
    });
  });

  it('Test not logged out user gets no effect from signout', () => {
    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({});
    });

    cy.visit('/signout').wait(1000);

    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({});
    });
  });
});
