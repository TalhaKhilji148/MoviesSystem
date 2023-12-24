describe("Movie App", () => {
  it("should display a list of movies", () => {
    cy.visit("/"); // Adjust the URL as needed
    cy.get("ul li").should("have.length.greaterThan", 0);
  });
});
