import FormatUrlImage from "../../../helpers/FormatUrlImage.js";
import PageManager from "../../../pages/PageManager.js";

export default class MediaCard extends HTMLElement{

    #shadow;

    constructor(){
        super();
        this.#render();
    };

    #render(){

        this.#shadow = this.attachShadow({mode : 'open'});
        this.#style();
        this.#html();
        this.#onInit();
    };

    #onInit(){

        const pageManager = new PageManager();

        this.#shadow.addEventListener("click", () => {
            
            const id = this.#shadow.host.getAttribute("data-id");
            const mediaType = this.#shadow.host.getAttribute("data-mediaType")
            pageManager.changeToDetailPage();
        });
    };

    #style(){

        let style = document.createElement('style');
        style.textContent = `

            .media-card__cover{

                background: red;
                width: 6.25rem;
                height: 8.76rem;
                border-radius: .25rem;
            }

            .media-card__name{

                font-size: .7rem;
                font-weight: 700;
                line-height: .8rem;
                color: #B6B6B6;
            }

            .media-card__release-year{

                font-weight: 400;
                font-size: .7rem;
                line-height: 6px;
                color: #828282;
            }
        `;

        this.#shadow.appendChild(style);
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
};

customElements.define('media-card', MediaCard);