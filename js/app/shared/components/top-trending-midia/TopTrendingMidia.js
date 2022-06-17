import TopTrendingMidiaController from "../../../controllers/TopTrendingMidiaController.js";
import FormatUrlImage from "../../../helpers/FormatUrlImage.js";

export default class TopTrendingMidia extends HTMLElement{

    #shadow;
    #topTrendingMidiaController;

    constructor(){
        super();
        this.#render();        
    }

    #render(){

        this.#shadow = this.attachShadow({mode: 'open'})
        this.#style();   
        this.#html();
    };

    async #style(){

        const {backdrop_path} = await this.#getTopTrendingMidiaDetails()
        let backgroundImg = FormatUrlImage.get(500, backdrop_path);

        let style = document.createElement('style');
        style.textContent = `

            .top-trending-midia{

                overflow: hidden;
                width: 100%;
                height: 281px;
                background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImg});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                background-blend-mode: multiply;

                font-family: 'Inter';
                font-style: normal;
                color: #FFFFFF;
            }

            .top-trending-midia__info{

                margin: 1rem;
            }

            .top-trending-midia__info__title{
                
                margin: 0;
                font-weight: 700;
                font-size: 1.5rem;
            }

            .top-trending-midia__info__details{

                display: flex;
                align-items: center;
                margin: 1rem 0;
            }

            .top-trending-midia__info__details__vote-average{

                margin: 0 1rem;
            }

            .top-trending-midia__info__details__vote-average svg{
                
                width: 14px;
                height: 14px
            }

            @media (min-width: 1279px){

                .top-trending-midia{

                    height: 50.5rem;
                    display: flex;
                    align-items: end;
                    font-family: 'Roboto';
                }

                .top-trending-midia__info{

                    margin: 5rem;
                }

                .top-trending-midia__info__title{
                    
                    font-weight: 700;
                    font-size: 64px;
                }
                
                .top-trending-midia__info h3{

                    width: 50%;
                    font-weight: 400;
                    font-size: 28px;
                    line-height: 33px;
                    margin: 1rem 0;
                }

                .top-trending-midia__info__details{

                    margin: 2rem 0;
                }

                .top-trending-midia__info__details__vote-average svg{

                    width: 40px;
                    height: 40px;
                }

                .top-trending-midia__info__details__vote-average span{

                    font-size: 40px;
                    margin: 0 1rem;
                }

                .top-trending-midia__info__details__date{

                    display: none;
                }
            }
        `;

        this.#shadow.appendChild(style);
    };

    async #html(){

        const {name, release_year, vote_average, overview} = await this.#getTopTrendingMidiaDetails();

        let html = document.createElement('div');
        html.classList.add('top-trending-midia');
        html.innerHTML = `

            <div class="top-trending-midia__info">
                <h1 class="top-trending-midia__info__title">${name}</h1>
                <h3>${overview}</h3>
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

    async #getTopTrendingMidiaDetails(){

        this.#topTrendingMidiaController = new TopTrendingMidiaController();
        return this.#topTrendingMidiaController.getTopTrendingMidiaDetails();
    };
}

customElements.define('top-trending-midia', TopTrendingMidia);