import MediaListController from "../../controllers/MediaListController.js";
import LoadPage from "../../services/LoadPage.js";
import { searchMedia } from "../../services/tmdb.js";
import ConvertDate from "../../helpers/ConvertDate.js";
import MediaCard from "../../shared/components/media-card/MediaCard.js";

export default class SearchPage extends HTMLElement{

    #shadow;
    #mediaListController;
    #page;
    #mediaType;

    constructor(){
        super();
        this.#page = 1;
        this.#mediaType = "tv"; 
        this.#render();
    };

    async #render(){
      
        this.#shadow = this.attachShadow({mode:'open'});
        await this.#style();
        await this.#html();        
    };

    async #style(){

        const style = await LoadPage.get('js/app/pages/search-page/search-page.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;
        
        this.#shadow.appendChild(styleElement);
    };

    async #html(){

        const html = document.createElement('div');
        let {list, total_pages} = await this.#loadList();

        await this.#clearItems();

        html.classList.add('search-page');
        html.innerHTML = `
            <div class="search-page__medias">
                <button class="search-page__medias__tv" data-media="tv" type="button">Tv</button>
                <button class="search-page__medias__movie" data-media="movie" type="button">Movie</button>
            </div>
            <h2 class="search-page__title">Results</h2>
            <div class="search-page__results">

                ${list.map(({poster_path, title, first_air_date, id, media_type}) => `    

                    <media-card data-poster="${poster_path}" 
                                data-name="${title}" 
                                data-year="${ConvertDate.fullDateForYearOnly(first_air_date)}"
                                data-id="${id}"
                                data-mediaType="${media_type}">
                    </media-card>
                `).join('')}
            </div>
            <div class="search-page__pages">
                <button class="search-page__pages__previous" type="button">Previous</button>
                <button class="search-page__pages__previousNumber" type="button">${this.#page-1}</button>
                <button class="search-page__pages__current" type="button">${this.#page}</button>
                <button class="search-page__pages__nextNumber" type="button">${this.#page+1}</button>
                <button class="search-page__pages__nextToNext" type="button">${this.#page+2}</button>
                <button class="search-page__pages__last" type="button">${total_pages}</button>
                <button class="search-page__pages__next" type="button">Next</button>
            </div>
        `;
        
        this.#shadow.appendChild(html);
        await this.#changePage();
        await this.#selectMediaQuery();
    };

    async #loadList(){

        let mediaList;
        let query = window.location.search.split('=')[1];
        let response = await searchMedia(this.#mediaType, query, this.#page);

        this.#mediaListController = new MediaListController();
        mediaList = await this.#mediaListController.createMediaList(response.results)
        return {
            'list' : mediaList.list, 
            'total_pages' : response.total_pages
        };
    };

    async #changePage(){

        const navigationButtons = this.#shadow.querySelectorAll('.search-page__pages button');
        navigationButtons.forEach(button => {

            button.addEventListener('click', () => {

                switch (button.innerHTML){
                    case "Previous":
                        this.#page--;
                        break;
                    case "Next":
                        this.#page++;
                        break;
                    default:
                        this.#page = parseInt(button.innerHTML);
                };
                this.#html();
            });
        });
    };

    async #selectMediaQuery(){

        const navigationButtons = this.#shadow.querySelectorAll('.search-page__medias button');
        navigationButtons.forEach(button => {

            button.addEventListener('click', () => {

                button.classList.add('selected');
                this.#mediaType = button.getAttribute("data-media");
                this.#html();
            });
        });
    };
    
    async #clearItems(){

        const itemsParent = this.#shadow.querySelector('.search-page');
        if(itemsParent) itemsParent.remove();
    };

};
customElements.define('search-page', SearchPage);