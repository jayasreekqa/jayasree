import LoginPage from '../../support/pageObjects/LoginPage';
import NavigationPage from '../../support/pageObjects/NavigationPage';

const loginPage = new LoginPage();
const navPage = new NavigationPage();

describe('Magento UI Tests - Login and Navigation', () => {
  
  it('Login - Valid credentials', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');
    loginPage.enterEmail('testuser@example.com');
    loginPage.enterPassword('Test@123');
    loginPage.clickLogin();

    cy.contains('My Account').should('be.visible');
  });

  it('Login - Invalid credentials', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');
    loginPage.enterEmail('wronguser@example.com');
    loginPage.enterPassword('WrongPass');
    loginPage.clickLogin();

    cy.get('.message-error').should('contain', 'The account sign-in was incorrect');
  });

  it('Navigation - Add and Remove Item from Cart', () => {
    cy.visit('https://magento.softwaretestingboard.com/');

    navPage.navigateToJackets();
    navPage.sortBySize('L');
    navPage.addFirstItemToCart();

    cy.get('.message-success').should('contain', 'You added');
    
    navPage.clearCart();
  });
});
