import MediaListController from "../../controllers/MediaListController.js";
import LoadPage from "../../services/LoadPage.js";
import { searchMedia } from "../../services/tmdb.js";
import ConvertDate from "../../helpers/ConvertDate.js";
import MediaCard from "../../shared/components/media-card/MediaCard.js";

export default class SearchPage extends HTMLElement{

    #shadow;
    #mediaListController;

    constructor(){
        super();
        this.#render();
    };

    #render(){
      
        this.#shadow = this.attachShadow({mode:'open'});
        this.#style();
        this.#html();        
    };

    async #style(){

        const style = await LoadPage.get('js/app/pages/search-page/search-page.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;
        
        this.#shadow.appendChild(styleElement);
    };

    async #html(){

        const html = document.createElement('div');
        let {list} = await this.#loadList();

        html.classList.add('search-page');
        html.innerHTML = `
            <h2 class="search-page__title">Results</h2>
            <div class="search-page__results">

                ${list.slice(0,18).map(({poster_path, title, first_air_date, id, media_type}) => `    

                    <media-card data-poster="${poster_path}" 
                                data-name="${title}" 
                                data-year="${ConvertDate.fullDateForYearOnly(first_air_date)}"
                                data-id="${id}"
                                data-mediaType="${media_type}">
                    </media-card>
                `).join('')}
            </div>
        `;

        this.#shadow.appendChild(html);
    };

    async #loadList(){

        let query = window.location.search.split('=')[1];
        let results = await searchMedia(query);

        this.#mediaListController = new MediaListController();
        return await this.#mediaListController.createMediaList(results.mediaList);
    };
};
customElements.define('search-page', SearchPage);