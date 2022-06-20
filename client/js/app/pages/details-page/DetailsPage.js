import LoadPage from "../../services/LoadPage.js";
import { getMediaById } from "../../services/tmdb.js";

export default class DetailsPage extends HTMLElement{

    #page;
    #shadow;

    constructor(){
        super();
        this.#render();
    };

    #render(){

        this.#shadow = this.attachShadow({mode: 'open'});        
        this.#style();
        this.#html();
    };

    async #getMediaDetails(){

        const id = this.#shadow.host.getAttribute("data-id");
        const mediaType = this.#shadow.host.getAttribute("data-mediaType");
        const mediaDetails = await getMediaById(id, mediaType);

        return mediaDetails;
    };

    async #style(){

        const style = await LoadPage.get('js/app/pages/details-page/details-page.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;
        
        this.#shadow.appendChild(styleElement);
    };

    async #html(){

        const html = document.createElement('div');
        const mediaDetails = await this.#getMediaDetails();
        console.log(mediaDetails);

        html.classList.add('details-page');
        html.innerHTML = `

            <div class="img"></div>
            <div class="details-page__card">

            </div>
            <div class="details-page__overview">
                <h3>Overview</h3>
                <span></span>
            </div>
        `;

        this.#shadow.appendChild(html);
    };
};

customElements.define('details-page', DetailsPage);