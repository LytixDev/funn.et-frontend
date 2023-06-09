apiUrl = Cypress.env('apiUrl');

describe('Listing list view', () => {
  beforeEach(() => {
    cy.intercept('GET', `${apiUrl}api/v1/public/categories`, {
      statusCode: 200,
      body: [{ id: 0, name: 'All' }],
    });
  });
  it('The listing list should display next pagination button with 24 listings', () => {
    const listings = [];
    for (let i = 0; i < 24; i++) {
      listings.push({
        id: i,
        briefDescription: `Listing ${i}`,
        category: 0,
        status: 'ACTIVE',
        price: 100,
        title: `Listing ${i}`,
      });
    }

    cy.intercept('POST', `${apiUrl}api/v1/public/listings`, {
      statusCode: 200,
      body: listings,
    });

    cy.visit('/');

    cy.wait(3000);
    cy.get("[data-testid='next-page-button']").should('exist');
  });
});
