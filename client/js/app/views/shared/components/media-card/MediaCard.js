

import DetailsPage from "../../../pages/details-page/DetailsPage.js";
import FormatUrlImage from "../../../../helpers/FormatUrlImage.js";
import Routes from "../../../../Routes.js";
import LoadPage from "../../../../services/LoadPage.js";

export default class MediaCard extends HTMLElement{

    #shadow;
    #routerOutlet;

    constructor(){
        super();
        this.#render();
        this.#route();
    };

    async #render(){

        const style = await this.#style();
        const html = await this.#html();
        this.#shadow = this.attachShadow({mode : 'open'});
        this.#shadow.appendChild(style);
        this.#shadow.appendChild(html);
    };

    #route(){

        this.addEventListener("click", () => {

            const routes = new Routes();
            const id = this.getAttribute("data-id");
            const mediaType = this.getAttribute("data-mediatype");
            const query = {route: `/details?q=${id}`}
            
            routes.addRoute({ 
                [query.route]: `<details-page 
                                data-id="${id}"
                                data-mediaType="${mediaType}">
                            </details-page>`
            });
            routes.onNavigate([query.route]);

            return false;
        });
    };

    async #style(){

        const style = await LoadPage.get('js/app/views/shared/components/media-card/media-card.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;

        return styleElement;
    };

    #html(){

        const html = document.createElement('div');
        const imgCoverPath = this.getAttribute("data-poster");
        const mediaName = this.getAttribute("data-name");
        const mediaReleaseYear = this.getAttribute("data-year");
        const imgCoverSrc = FormatUrlImage.get(500, imgCoverPath);

        html.classList.add('media-card');
        html.innerHTML = `
        
            <img src="${imgCoverSrc}" class="media-card__cover skeleton" alt="Media Cover">
            <div class="media-card__text">
                <h2 class="media-card__text__name">${mediaName}</h2>
                <h3 class="media-card__text__release-year">${mediaReleaseYear}</h3>
            </di>
        `;

        return html;
    };
}

customElements.define('media-card', MediaCard);