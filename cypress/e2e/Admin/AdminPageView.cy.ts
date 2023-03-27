let apiUrl = Cypress.env('apiUrl');

describe('Test user using the login page', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.intercept('GET', `${apiUrl}api/v1/public/categories`, {
      statusCode: 200,
      body: [{ id: 1, name: 'Sports' }],
    });
  });

  it('Test admin user can access admin page', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';
    const role = 'ADMIN';
    cy.setCookie('userInfo', JSON.stringify({ accessToken: testToken, username: username, role: role }));

    cy.intercept('GET', `${apiUrl}api/v1/private/users/me`, {
      statusCode: 200,
      body: {
        id: 1,
        username: username,
        email: '',
        role: role,
        firstName: '',
        lastName: '',
      },
    });

    cy.visit('/admin').wait(1000);
    cy.url().should('include', '/admin');
  });

  it('Test non-admin user can non access admin page', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';
    const role = 'ROLE';
    cy.setCookie('userInfo', JSON.stringify({ accessToken: testToken, username: username, role: role }));

    cy.intercept('GET', `${apiUrl}api/v1/private/users/me`, {
      statusCode: 200,
      body: {
        id: 1,
        username: username,
        email: '',
        role: role,
        firstName: '',
        lastName: '',
      },
    });

    cy.visit('/admin').wait(1000);
    cy.url().should('not.include', '/admin');
  });

  it('Test admin user can add new category', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';
    const role = 'ADMIN';
    const newCategoryName = 'Category1';
    cy.setCookie('userInfo', JSON.stringify({ accessToken: testToken, username: username, role: role }));

    cy.intercept('GET', `${apiUrl}api/v1/private/users/me`, {
      statusCode: 200,
      body: {
        id: 1,
        username: username,
        email: '',
        role: role,
        firstName: '',
        lastName: '',
      },
    });

    cy.intercept('POST', `${apiUrl}api/v1/private/categories`, {
      statusCode: 200,
      body: {
        name: newCategoryName,
      },
    });

    cy.visit('/admin').wait(1000);
    cy.get('input[data-testid="name"]').type(newCategoryName);
    cy.get('button[data-testid="submit-category-button"]').click();

    cy.get('input[data-testid="Category1"]', { timeout: 60000 }).should('exist');
  });

  it('Test admin user can delete category', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';
    const role = 'ADMIN';
    cy.setCookie('userInfo', JSON.stringify({ accessToken: testToken, username: username, role: role }));

    cy.intercept('GET', `${apiUrl}api/v1/private/users/me`, {
      statusCode: 200,
      body: {
        id: 1,
        username: username,
        email: '',
        role: role,
        firstName: '',
        lastName: '',
      },
    });

    cy.intercept('DELETE', `${apiUrl}api/v1/private/categories/1`, {
      statusCode: 200,
    });

    cy.visit('/admin').wait(1000);
    cy.get('svg[data-testid="delete-Sports"]').click().wait(1000);
    cy.get('input[data-testid="Sports"]').should('not.exist');
  });

  it('Test admin user can update category', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';
    const role = 'ADMIN';
    cy.setCookie('userInfo', JSON.stringify({ accessToken: testToken, username: username, role: role }));

    cy.intercept('GET', `${apiUrl}api/v1/private/users/me`, {
      statusCode: 200,
      body: {
        id: 1,
        username: username,
        email: '',
        role: role,
        firstName: '',
        lastName: '',
      },
    });

    cy.visit('/admin').wait(1000);
    cy.get('input[data-testid="Sports"]').clear().type('Books');

    cy.intercept('PUT', `${apiUrl}api/v1/private/categories/1`, {
      statusCode: 200,
      body: {
        id: 1,
        name: 'Books',
      },
    });

    cy.get('svg[data-testid="save-Books"]').click().wait(1000);
    cy.get('input[data-testid="Books"]').should('exist');
  });
});
