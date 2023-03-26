apiUrl = Cypress.env('apiUrl');

describe('Listing list view', () => {
  it('The listing list should display next pagination button with 20 listings', () => {
    const listings = [];
    for (let i = 0; i < 24; i++) {
      listings.push({
        id: i,
        briefDescription: `Listing ${i}`,
        category: 'ELECTRONICS',
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
