export default class NavBar extends window.HTMLElement{

    constructor(){
        super();
        this.#onInit();
    };

    #onInit(){

        let shadow = this.attachShadow({mode : 'open'});
        shadow.appendChild(this.#style());
        shadow.appendChild(this.#html());
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
                
                margin: 1rem;
                color: #FFFFFF;
            }
        `;

        return style;
    }

    #html(){

        let html = document.createElement('div');
        html.classList.add('nav-bar');
        html.innerHTML = `
            <h2 class="nav-bar__logo">Vilm</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search nav-bar__search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
        `;

        return html;
    };
};

customElements.define('nav-bar', NavBar);