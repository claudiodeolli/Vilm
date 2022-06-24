
import FormatUrlImage from "../../../helpers/FormatUrlImage.js";
import LoadPage from "../../../services/LoadPage.js";
import { getMediaById } from "../../../services/tmdb.js";


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

        const style = await LoadPage.get('js/app/views/pages/details-page/details-page.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;
        
        this.#shadow.appendChild(styleElement);
    };

    async #html(){

        const html = document.createElement('div');
        const media = await this.#getMediaDetails();
        const imgCover = FormatUrlImage.get(500, media.backdrop_path);
        const imgPoster = FormatUrlImage.get(500, media.poster_path);

        html.classList.add('details-page');
        html.innerHTML = `

            <div class="details-page__overlay">
                <div class="details-page__overlay__color"></div>
                <img class="details-page__overlay__cover" src="${imgCover}" alt="Media Cover">
            </div>
            
            <div class="details-page__info">

                <div class="details-page__info__card">
                    <img src="${imgPoster}" class="details-page__info__card__poster" alt="Media Poster">
                    <h2 class="details-page__info__card__title">${media.title ? media.title : media.name}</h2>
                    <div class="details-page__info__card__rating">
                        <svg class="details-page__info__card__rating__icon bi bi-star-fill" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        <span class="details-page__info__card__rating__vote">${media.vote_average}</span>
                    </div>
                </div>
                <div class="details-page__info__overview">
                    <h3 class="details-page__info__overview__title">Overview</h3>
                    <span class="details-page__info__overview__text">${media.overview}</span>
                </div>
            </div>
        `;

        this.#shadow.appendChild(html);
    };
};

customElements.define('details-page', DetailsPage);