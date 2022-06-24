

import DetailsPage from "../../../pages/details-page/DetailsPage.js";
import FormatUrlImage from "../../../../helpers/FormatUrlImage.js";
import Routes from "../../../../routes.js";
import LoadPage from "../../../../services/LoadPage.js";

export default class MediaCard extends HTMLElement{

    #shadow;
    #routerOutlet;

    constructor(){
        super();
        this.#render();
        this.#route();
    };

    #render(){

        this.#shadow = this.attachShadow({mode : 'open'});
        this.#style();
        this.#html();
    };

    #route(){

        this.#shadow.addEventListener("click", () => {

            const routes = new Routes();
            const id = this.#shadow.host.getAttribute("data-id");
            const mediaType = this.#shadow.host.getAttribute("data-mediatype");
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

        this.#shadow.appendChild(styleElement);
    };

    #html(){

        const html = document.createElement('div');
        const imgCoverPath = this.#shadow.host.getAttribute("data-poster");
        const mediaName = this.#shadow.host.getAttribute("data-name");
        const mediaReleaseYear = this.#shadow.host.getAttribute("data-year");
        const imgCoverSrc = FormatUrlImage.get(500, imgCoverPath);

        html.classList.add('media-card');
        html.innerHTML = `
        
            <img src="${imgCoverSrc}" class="media-card__cover skeleton" alt="Media Cover">
            <div class="media-card__text">
                <h2 class="media-card__text__name">${mediaName}</h2>
                <h3 class="media-card__text__release-year">${mediaReleaseYear}</h3>
            </di>
        `;

        this.#shadow.appendChild(html);
    };
}

customElements.define('media-card', MediaCard);