export default class DetailsPage extends HTMLElement{

    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `

            <top-trending-midia></top-trending-midia>
            <media-list data-title="Trending Movies" data-search="movie/week"></media-list>
        `;
    };

};

customElements.define('details-page', DetailsPage);