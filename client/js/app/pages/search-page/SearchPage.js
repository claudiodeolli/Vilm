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
        await this.#renderMediaSelectHtml();
        this.#html();        
    };

    async #style(){

        const style = await LoadPage.get('js/app/pages/search-page/search-page.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;
        
        this.#shadow.appendChild(styleElement);
    };

    async #renderMediaSelectHtml(){

        const html = document.createElement('div');
        html.classList.add('mediaSelect');
        html.innerHTML = `
            <div class="mediaSelect__medias">
                <button class="mediaSelect__medias__tv selected" data-media="tv" type="button">Tv</button>
                <button class="mediaSelect__medias__movie" data-media="movie" type="button">Movie</button>
            </div>
        `;

        this.#shadow.appendChild(html);
    };

    async #html(){

        const html = document.createElement('div');
        let {list, total_pages} = await this.#loadList();

        await this.#clearItems();

        html.classList.add('search-page');
        html.innerHTML = `
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
                <button class="search-page__pages__button previous" type="button">Previous</button>
                <button class="search-page__pages__button first" type="button">First</button>
                <button class="search-page__pages__button beforeCurrent" type="button">${this.#page-1}</button>
                <button class="search-page__pages__button current" type="button">${this.#page}</button>
                <button class="search-page__pages__button afterCurrent" type="button">${this.#page+1}</button>
                <button class="search-page__pages__button nextOfAfterCurrent" type="button">${this.#page+2}</button>
                <button class="search-page__pages__button total" type="button">${total_pages}</button>
                <button class="search-page__pages__button next" type="button">Next</button>
            </div>
        `;
        
        this.#shadow.appendChild(html);
        await this.#changePage();
        this.#managePaginationButtons();
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
                    case "First":
                        this.#page = 1;
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

        const navigationButtons = this.#shadow.querySelectorAll('.mediaSelect__medias button');
        navigationButtons.forEach(button => {

            button.addEventListener('click', () => {

                navigationButtons.forEach(button => {
                    button.classList.remove('selected');
                });
                button.classList.add('selected');
                this.#mediaType = button.getAttribute("data-media");
                this.#page = 1;
                this.#html();
            });
        });
    };
    
    async #clearItems(){

        const itemsParent = this.#shadow.querySelector('.search-page');
        if(itemsParent) itemsParent.remove();
    };

    #managePaginationButtons(){

        const paginationButtons = {
            'previous': this.#shadow.querySelector('.previous'),
            'first': this.#shadow.querySelector('.first'),
            'beforeCurrent': this.#shadow.querySelector('.beforeCurrent'),
            'current': this.#shadow.querySelector('.current'),
            'afterCurrent': this.#shadow.querySelector('.afterCurrent'),
            'nextOfAfterCurrent': this.#shadow.querySelector('.nextOfAfterCurrent'),
            'total': this.#shadow.querySelector('.total'),
            'next': this.#shadow.querySelector('.next'),
        };
        const itsOnTheFirstPage = paginationButtons.current.innerHTML == 1;
        const itsOnTheLastPage = paginationButtons.current.innerHTML == paginationButtons.total.innerHTML;
        const itsOnThePenultimatePage = paginationButtons.afterCurrent.innerHTML == paginationButtons.total.innerHTML;
        const isOnTheAntepenultimatePage = paginationButtons.total.innerHTML == paginationButtons.nextOfAfterCurrent.innerHTML;
        const noMediaFound = paginationButtons.total.innerHTML == 0;

        if(itsOnTheFirstPage){

            paginationButtons.first.disabled = true;
            paginationButtons.previous.disabled = true;
            paginationButtons.beforeCurrent.remove();
        };
        if(itsOnTheLastPage){

            paginationButtons.next.disabled = true;
            paginationButtons.total.remove();
            paginationButtons.afterCurrent.remove();
            paginationButtons.nextOfAfterCurrent.remove();
        };
        if(itsOnThePenultimatePage){

            paginationButtons.afterCurrent.remove();
            paginationButtons.nextOfAfterCurrent.remove();
        };
        if(isOnTheAntepenultimatePage){

            paginationButtons.total.remove();
        };
        if(noMediaFound){

            paginationButtons.next.disabled = true;
            paginationButtons.afterCurrent.remove();
            paginationButtons.nextOfAfterCurrent.remove();
            paginationButtons.total.remove();
        }
    };

};
customElements.define('search-page', SearchPage);