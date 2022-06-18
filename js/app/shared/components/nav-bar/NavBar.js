export default class NavBar extends window.HTMLElement{

    #shadow;

    constructor(){
        super();
        this.#render();
        this.#onInit();
    };

    #render(){

        this.#shadow = this.attachShadow({mode : 'open'});        

        this.#shadow.appendChild(this.#style());
        this.#shadow.appendChild(this.#html());
    };

    #onInit(){

        let searchButton = this.#shadow.querySelector('#searchButton');

        searchButton.addEventListener('click', ()=> this.#toggleSearchInput());
    };
     
    #style(){

        let style = document.createElement('style');
        style.textContent = `

            .nav-bar{

                display: flex;
                background-color: #1A1F38;
                justify-content: space-between;
                align-items: center;
            }

            .nav-bar__logo{

                font-family: 'Inter';
                font-weight: 700;
                font-size: 14px;
                color: #FFFFFF;
                margin: 1rem;
            }

            .nav-bar__search{

                position: relative;
                text-align: right;
                display: flex;
                align-items: center;
                margin: 0 1rem;
            }

            .nav-bar__search__input{

                width: 0px;
                opacity: 0;
                transition: width .5s, opacity .5s;
                color: #FFFFFF;           

                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                background: rgba(196, 196, 196, 0.4);
                border-radius: .25rem;
                border: 0;
                padding-bottom: 4px;
            }

            .nav-bar__search__icon{
                
                position: absolute;
                right: .5rem;
                color: #FFFFFF;                
            }

            .collapsed-input{

                width: 181px;
                opacity: 1;
                transition: width .5s, opacity .5s;
            }

            @media (min-width: 768px)
            {
                .nav-bar__logo{

                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 48px;
                    color: #FFFFFF;
                    margin: 1rem 70px;
                }

                .nav-bar__search__input{

                    width: 0px;
                    opacity: 0;
                    font-size: 36px;
                    padding-bottom: .5rem;
                    border-radius: .5rem;
                }

                .nav-bar__search__icon{

                    width: 35px;
                    height: 35px;           
                }

                .collapsed-input{

                    width: 350px;
                    opacity: 1;
                    transition: width .5s, opacity .5s;
                }
            }

            @media (min-width: 1200px)
            {
                .nav-bar__logo{

                    font-size: 32px;
                    margin: .5rem 70px;
                }

                .nav-bar__search__input{

                    font-size: 1rem;
                    border-radius: .25rem;
                    width: 300px;
                }

                .nav-bar__search__icon{

                    width: 1rem;
                    height: 1rem;           
                }

                .collapsed-input{

                    width: 300px;
                }
            }
        `;

        return style;
    };

    #html(){

        let html = document.createElement('div');
        html.classList.add('nav-bar');
        html.innerHTML = `
            <h2 class="nav-bar__logo">Vilm</h2>
            <div class="nav-bar__search">
                <input id="search" type='text' class="nav-bar__search__input"> </input>
                <svg id="searchButton" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search nav-bar__search__icon" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </div>
        `;

        return html;
    };

    #toggleSearchInput(){

        const searchInput = this.#shadow.querySelector('#search');

        searchInput.classList.toggle('collapsed-input');
        searchInput.value = "";
    };
};

customElements.define('nav-bar', NavBar);