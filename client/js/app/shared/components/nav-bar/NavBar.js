import LoadPage from "../../../services/LoadPage.js";

export default class NavBar extends HTMLElement{

    #shadow;

    constructor(){
        super();
        this.#render();
        this.#onInit();
    };

    #render(){

        this.#shadow = this.attachShadow({mode : 'open'});        

        this.#style();
        this.#html();
    };

    #onInit(){

        let searchButton = this.#shadow.querySelector('#searchButton');

        searchButton.addEventListener('click', ()=> this.#toggleSearchInput());
    };
     
    async #style(){

        const style = await LoadPage.get('js/app/shared/components/nav-bar/nav-bar.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;
        
        this.#shadow.appendChild(styleElement);
    };

    #html(){

        let html = document.createElement('div');
        html.classList.add('nav-bar');
        html.innerHTML = `
            <h2 class="nav-bar__logo">Vilm</h2>
            <div class="nav-bar__search">
                <input id="search" type='text' class="nav-bar__search__input"> </input>
                <svg id="searchButton" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search nav-bar__search__icon" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </div>
        `;

        this.#shadow.appendChild(html);
    };

    #toggleSearchInput(){

        const searchInput = this.#shadow.querySelector('#search');

        searchInput.classList.toggle('expanded-input');
        searchInput.value = "";
    };
};

customElements.define('nav-bar', NavBar);