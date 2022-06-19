describe('Media card tests', () => {

    it('the top-trending-media component should be rendered', () => {

        cy.visit('http://127.0.0.1:5500/index.html');

        cy.get('main-page').shadow().find('top-trending-midia');
    });

    it('the top-trending-media component data shoud be rendered correctly', () => {

        cy.visit('http://127.0.0.1:5500/index.html');


    })
})