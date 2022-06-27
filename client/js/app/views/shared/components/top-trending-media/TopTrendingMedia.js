
import TopTrendingMidiaController from "../../../../controllers/TopTrendingMidiaController.js";
import FormatUrlImage from "../../../../helpers/FormatUrlImage.js";
import Routes from "../../../../Routes.js";
import LoadPage from "../../../../services/LoadPage.js";


export default class TopTrendingMidia extends HTMLElement{

    #shadow;
    #data;
    #topTrendingMidiaController;

    constructor(){
        super();
        this.#onInit();
    }

    async #onInit(){

        this.#data = await this.#getTopTrendingMidiaData();
        this.#render();      
        this.#route();  
    };

    async #getTopTrendingMidiaData(){

        this.#topTrendingMidiaController = new TopTrendingMidiaController();
        return this.#topTrendingMidiaController.getTopTrendingMidiaDetails();
    };

    #render(){

        this.#shadow = this.attachShadow({mode: 'open'})
        this.#style();   
        this.#html();
    };

    #route(){

        this.#shadow.addEventListener("click", () => {

            const routes = new Routes();
            const { id, media_type } = this.#data;
            const query = {route: `/details?q=${id}`}
            
            routes.addRoute({ 
                [query.route]: `<details-page 
                                data-id="${id}"
                                data-mediaType="${media_type}">
                            </details-page>`
            });
            routes.onNavigate([query.route]);

            return false;
        });
    };

    async #style(){

        const style = await LoadPage.get('js/app/views/shared/components/top-trending-media/top-trending-media.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;

        this.#shadow.appendChild(styleElement);
    };

    async #html(){

        const {title, release_year, vote_average, overview, backdrop_path} = this.#data;
        let backgroundImg = FormatUrlImage.get(500, backdrop_path);

        let html = document.createElement('div');
        html.classList.add('top-trending-midia');
        html.innerHTML = `

            <div class="top-trending-midia__overlay">
                <div class="top-trending-midia__overlay__color"></div>
                <img src="${backgroundImg}" class="top-trending-midia__overlay__cover" alt="Media Cover">
            </div>

            <div class="top-trending-midia__info">
                <h1 class="top-trending-midia__info__title">${title}</h1>
                <h3 class="top-trending-midia__info__overview">${overview}</h3>
                <div class="top-trending-midia__info__details">
                    <span class="top-trending-midia__info__details__date">${release_year}</span>
                    <div class="top-trending-midia__info__details__vote-average">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        <span>${vote_average}</span>
                    </div>
                </div>
            </div>
        `;

        this.#shadow.appendChild(html);
    };
}

customElements.define('top-trending-midia', TopTrendingMidia);