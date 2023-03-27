apiUrl = Cypress.env('apiUrl');

describe('Listing detail view', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.intercept('GET', `${apiUrl}api/v1/public/categories`, {
      statusCode: 200,
      body: [{ id: 1, name: 'Sports' }],
    });
  });

  it('Test viewing a valid listing without being logged in is okay', () => {
    cy.intercept('GET', `${apiUrl}api/v1/public/listings/1`, {
      statusCode: 200,
      body: {
        id: 1,
        username: 'Callum',
        location: 1,
        title: 'Mormi',
        briefDescription: 'Callu morsi',
        category: { id: 1, name: 'Sports' },
        status: 'ACTIVE',
        price: 300,
      },
    });

    cy.intercept('GET', `${apiUrl}api/v1/public/locations/1`, {
      statusCode: 200,
      body: {
        id: 1,
        address: 'Domen',
        latitude: 63.42688,
        longitude: 10.39669,
        postCode: 7013,
        city: 'Domcity',
      },
    });

    cy.visit('/listing/1');
    cy.wait(1000);
    cy.url().should('include', '/listing/1');
  });

  it('Test viewing a valid listing as owner gives extra privileges over listing', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'me';
    cy.setCookie('userInfo', JSON.stringify({ accessToken: testToken, username: username, role: 'USER' }));

    cy.intercept('GET', `${apiUrl}api/v1/public/listings/1`, {
      statusCode: 200,
      body: {
        id: 1,
        username: 'me',
        location: 1,
        title: 'Mormi',
        briefDescription: 'Callu morsi',
        category: { id: 1, name: 'Sports' },
        status: 'ACTIVE',
        price: 300,
      },
    });

    cy.intercept('GET', `${apiUrl}api/v1/public/locations/1`, {
      statusCode: 200,
      body: {
        id: 1,
        address: 'Domen',
        latitude: 63.42688,
        longitude: 10.39669,
        postCode: 7013,
        city: 'Domcity',
      },
    });

    cy.visit('/listing/1');
    cy.wait(1000);
    cy.url().should('include', '/listing/1');
    cy.get('button[data-testid="sold-button"]').should('exist');
    cy.get('button[data-testid="archive-button"]').should('exist');
    cy.get('a[data-testid="edit-button"]').should('exist');
  });

  it('Test viewing a valid listing as non-owner does not gives extra privileged buttons', () => {
    cy.intercept('GET', `${apiUrl}api/v1/public/listings/1`, {
      statusCode: 200,
      body: {
        id: 1,
        username: 'me',
        location: 1,
        title: 'Mormi',
        briefDescription: 'Callu morsi',
        category: { id: 1, name: 'Sports' },
        status: 'ACTIVE',
        price: 300,
      },
    });

    cy.intercept('GET', `${apiUrl}api/v1/public/locations/1`, {
      statusCode: 200,
      body: {
        id: 1,
        address: 'Domen',
        latitude: 63.42688,
        longitude: 10.39669,
        postCode: 7013,
        city: 'Domcity',
      },
    });

    cy.visit('/listing/1');
    cy.wait(1000);
    cy.url().should('include', '/listing/1');
    cy.get('button[data-testid="sold-button"]').should('not.exist');
    cy.get('button[data-testid="archive-button"]').should('not.exist');
    cy.get('a[data-testid="edit-button"]').should('not.exist');
  });
});
