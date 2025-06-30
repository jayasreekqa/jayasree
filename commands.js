class LoginPage {
  enterEmail(email) {
    cy.get('#email').clear().type(email);
  }

  enterPassword(password) {
    cy.get('#pass').clear().type(password);
  }

  clickLogin() {
    cy.get('#send2').click();
  }
}

class NavigationPage {
  navigateToJackets() {
    cy.get("a[href*='men']").trigger('mouseover');
    cy.contains('Tops').trigger('mouseover');
    cy.contains('Jackets').click();
  }

  sortBySize(size) {
    cy.get('#sorter').select('Size');
  }

  addFirstItemToCart() {
    cy.get('.product-item').first().trigger('mouseover');
    cy.contains('Add to Cart').click();
  }

  clearCart() {
    cy.get('.showcart').click();
    cy.get('.actions .action.delete').click({ force: true });
    cy.contains('OK').click();
  }
}

export default NavigationPage;
