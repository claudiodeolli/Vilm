export default class DetailsPage extends HTMLElement{

    #page;

    constructor(){
        super();
        this.#page = document.querySelector('details-page');
    }
}

customElements.define('details-page', DetailsPage)