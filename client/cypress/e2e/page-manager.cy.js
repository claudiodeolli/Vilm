describe('Page manager tests', () => {

    it('the page manager component should be rendered', () => {

        cy.visit('http://127.0.0.1:5500/index.html');

        cy.get('page-manager');
    });

    it('the main-page should be rendered', () => {

        cy.visit('http://127.0.0.1:5500/index.html');

        cy.get('page-manager').shadow().find('main-page');
    });

    it('must navigate to details page', () => {

        cy.visit('http://127.0.0.1:5500/index.html');

        cy.get('page-manager').shadow()
            .find('main-page').shadow()
            .find('media-list').shadow()
            .find('media-card').shadow()
            .find('.media-card').first()
            .click()
            .then(() => {

                cy.get('page-manager').shadow().find('details-page');
            });
    });
})