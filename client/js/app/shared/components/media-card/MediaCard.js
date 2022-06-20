import FormatUrlImage from "../../../helpers/FormatUrlImage.js";
import { Routes } from "../../../routes.js";
import LoadPage from "../../../services/LoadPage.js";

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

        const routes = new Routes({ 
            '/details': `<details-page></details-page>` 
        });

        this.#shadow.addEventListener("click", () => {
            routes.onNavigate('/details');
            return false;
        });
    };

    async #style(){

        const style = await LoadPage.get('js/app/shared/components/media-card/media-card.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;

        this.#shadow.appendChild(styleElement);
    };

    #html(){

        let html = document.createElement('div');
        let imgCoverPath = this.#shadow.host.getAttribute("data-poster");
        let mediaName = this.#shadow.host.getAttribute("data-name");
        let mediaReleaseYear = this.#shadow.host.getAttribute("data-year");
        let imgCoverSrc = FormatUrlImage.get(500, imgCoverPath);

        html.classList.add('media-card');
        html.innerHTML = `
        
            <img src="${imgCoverSrc}" class="media-card__cover" alt="Media Cover">
            <h2 class="media-card__name">${mediaName}</h2>
            <h3 class="media-card__release-year">${mediaReleaseYear}</h3>
        `;

        this.#shadow.appendChild(html);
    };
}

customElements.define('media-card', MediaCard);