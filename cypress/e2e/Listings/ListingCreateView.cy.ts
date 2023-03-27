apiUrl = Cypress.env('apiUrl');

describe('Create listing view', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.intercept('GET', `${apiUrl}api/v1/public/categories`, {
      statusCode: 200,
      body: [{ id: 1, name: 'Sports' }],
    });
  });

  it('Test attempting to create a listing without a user redirects to login', () => {
    cy.visit('/create-listing');
    cy.wait(1000);
    cy.url().should('include', '/login');
  });

  it('Test logged in user can create a listing', () => {
    const testToken = 'TestTokenFromMockBackend';
    const username = 'TestUser';
    cy.setCookie('userInfo', JSON.stringify({ accessToken: testToken, username: username, role: 'USER' }));
    const title = 'Test Listing';
    const briefDescription = 'Test Description';
    const price = 100;

    cy.intercept('POST', `${apiUrl}api/v1/private/locations`, {
      statusCode: 200,
      body: { id: 1, address: 'Bodissveien 1', latitude: 59.91273, longitude: 10.74609, postCode: 2179, city: 'Bodø' },
    });

    cy.intercept('POST', `${apiUrl}api/v1/private/listings`, {
      statusCode: 200,
      body: {
        location: 1,
        title: title,
        briefDescription: briefDescription,
        category: 1,
        status: 'ACTIVE',
        price: price,
        publicationDate: '2022-05-05',
        expirationDate: '2023-05-05',
      },
    });

    cy.visit('/create-listing');
    cy.get('input[data-testid="title"]').type(title);
    cy.get('input[data-testid="brief-description"]').type(briefDescription);
    cy.get('input[data-testid="price"]').type(price.toString());
    cy.get('select[data-testid="listing-category"]').select('Sports');
    cy.get('input[data-testid="search-input"]').type('Bodiss');
    cy.get('button[data-testid="submit-button"]').click();
    cy.get('button[data-testid="create-listing-button"]').click();

    cy.wait(1000);

    //const title = 'Test Listing';
    //const briefDescription = 'Test Description';
  });
});
