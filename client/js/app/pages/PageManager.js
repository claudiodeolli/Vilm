import MainPage from '../pages/main-page.js';

export default class PageManager extends HTMLElement{

    #shadow;

    constructor(){
        super();
        this.#render();
    };

    #render(){

        this.#shadow = this.attachShadow({mode: 'open'});
        this.#shadow.innerHTML = `
            <main-page></main-page>
        `;
    };

    changeToDetailPage(){

        this.#shadow.innerHTML = `
            <details-page></details-page>
        `;
    }
};

customElements.define('page-manager', PageManager);