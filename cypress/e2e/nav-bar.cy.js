describe('NavBar tests', () => {
  it('the navbar should be rendered', () => {
    cy.visit('http://127.0.0.1:5500/index.html');
  
    cy.get('nav-bar');
  });

  it('the title should be rendered correctly', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.get('nav-bar').shadow().find('.nav-bar__logo').should('contain', 'Vilm');
  });

  it('the search input should be rendered', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.get('nav-bar').shadow().find('input');
  })

  it('input have to be expanded on click', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.get('nav-bar').shadow().find('#searchButton')
      .click()
      .then(() => {

        cy.get('nav-bar').shadow().find('input').should('have.class', 'expanded-input');
      })
  });
})