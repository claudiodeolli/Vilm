
import MediaListController from "../../../../controllers/MediaListController.js";
import ConvertDate from "../../../../helpers/ConvertDate.js";
import LoadPage from "../../../../services/LoadPage.js";
import { getTrendingMedia } from "../../../../services/tmdb.js";
import MediaCard from "../media-card/MediaCard.js";

export default class MediaList extends HTMLElement{

    #mediaListController;
    #theCardsAreBeingLoaded;

    constructor(){
        super();
        this.#render();
    };

    async #render(){

        const {list} = await this.#loadList();
        const style = await this.#style();
        const html = await this.#html(list);
        const shadow = this.attachShadow({mode : 'open'});

        shadow.appendChild(style);
        shadow.appendChild(html);

        this.#theCardsAreBeingLoaded = setInterval(()=>{
            this.#cardsLoading();
        },500);
    };

    async #loadList(){

        let request = this.getAttribute("data-search");
        const {results} = await getTrendingMedia(request);
        
        this.#mediaListController = new MediaListController();
        
        return await this.#mediaListController.createMediaList(results);
    };

    async #style(){

        const style = await LoadPage.get('js/app/views/shared/components/media-list/media-list.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;

       return styleElement;
    };

    async #html(list){

        let listTitle = this.getAttribute("data-title");
        let html = document.createElement('div');

        html.classList.add('media-list');

        html.innerHTML = `
                
            <h2 class="media-list__title">${listTitle}</h2>
            <div class="media-list__cards">

                ${list.slice(0, 4).map(({poster_path, title, first_air_date, id, media_type}) => `

                    <div class="card-skeleton">

                        <div class="card-skeleton__card">

                            <div class="card-skeleton__card__poster"></div>
                            <div class="card-skeleton__card__text">
                                <span class="card-skeleton__card__text__title"></span>
                                <span class="card-skeleton__card__text__year"></span>
                            </div>
                            
                        </div>
                    </div>

                    <media-card style="display: none"
                                data-poster="${poster_path}" 
                                data-name="${title}" 
                                data-year="${ConvertDate.fullDateForYearOnly(first_air_date)}"
                                data-id="${id}"
                                data-mediaType="${media_type}">
                    </media-card>
                `).join('')}
            </div>
        `;

        return html;
    };

    #cardsLoading(){

        const cards = Array.from(this.shadowRoot.querySelectorAll('media-card'));
        
        let loadedCards = cards.map(card => {

            const cardIsLoaded = card.shadowRoot;
            
            if(cardIsLoaded){
                
                card.style.display = "block"
                if(card.previousElementSibling){

                    if(card.previousElementSibling.classList.contains('card-skeleton')){
                        card.previousElementSibling.remove();      
                    }
                }
            }

            return card.shadowRoot
        });

        if(this.#allCardsHaveBeenLoaded(loadedCards)){

            clearInterval(this.#theCardsAreBeingLoaded);
        };
    };

    #allCardsHaveBeenLoaded(loadedCards){

        return loadedCards.every(card => card);
    };
};

customElements.define('media-list', MediaList);