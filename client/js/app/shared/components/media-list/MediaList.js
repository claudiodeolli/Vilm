import MediaListController from "../../../controllers/MediaListController.js";
import ConvertDate from "../../../helpers/ConvertDate.js";
import { getTrendingMedia } from "../../../services/tmdb.js";
import MediaCard from "../media-card/MediaCard.js";

export default class MediaList extends HTMLElement{

    #shadow;
    #mediaListController;

    constructor(){
        super();
        this.#render();
    };

    #render(){

        this.#shadow = this.attachShadow({mode : 'open'});

        this.#style();
        this.#html();
    };

    async #loadList(){

        let request = this.#shadow.host.getAttribute("data-search");
        const {results} = await getTrendingMedia(request);
        
        this.#mediaListController = new MediaListController();
        return await this.#mediaListController.createMediaList(results);
    };

    #style(){

        let style = document.createElement('style');
        style.textContent = `

            .media-list{

                margin: 1rem;

                font-family: 'Inter';
                font-weight: 700;
            }

            .media-list__title{

                font-size: 14px;
                color: #A2ACA6;
            }

            .media-list__cards{

                display: grid;
                gap: 22px;
                grid-auto-flow: column;
                overflow: scroll;
            }
        `;

        this.#shadow.appendChild(style);
    };

    async #html(){

        let listTitle = this.#shadow.host.getAttribute("data-title");
        let {list} = await this.#loadList();
        let html = document.createElement('div');

        html.classList.add('media-list');

        html.innerHTML = `
                
            <h2 class="media-list__title">${listTitle}</h2>
            <div class="media-list__cards">

                ${list.map(({poster_path, title, first_air_date, id, media_type}) => `    

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
};

customElements.define('media-list', MediaList);