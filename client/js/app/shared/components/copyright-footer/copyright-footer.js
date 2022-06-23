import LoadPage from "../../../services/LoadPage.js";

export default class CopyrightFooter extends HTMLElement{

    #shadow;

    constructor(){

        super();
        this.#render();   
    };

    #render(){

        this.#shadow = this.attachShadow({mode : 'open'});

        this.#style();
        this.#html();
    };

    async #style(){

        const style = await LoadPage.get('js/app/shared/components/copyright-footer/copyright-footer.css');
        const styleElement = document.createElement('style');

        styleElement.textContent = style;

        this.#shadow.appendChild(styleElement);
    };

    #html(){

        const html = document.createElement('div');
        html.classList.add('copyright-footer');

        html.innerHTML = `
        
            <div class="copyright">
                <div class="copyright__title">
                    <span class="copyright__title__logo">Vilm</span>
                    <span class="copyright__title__year"> © 2021</span>
                </div>
                <span class="copyright__api">
                    <span class="copyright__api__description">powered by</span>
                    <span class="copyright__api__name">tmdb</span>
                </span>
            </div>
        `;

        this.#shadow.appendChild(html);
    };
}

customElements.define('copyright-footer', CopyrightFooter);