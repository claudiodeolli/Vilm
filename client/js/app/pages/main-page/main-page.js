import TopTrendingMidia from '../../shared/components/top-trending-midia/TopTrendingMidia.js';
import MediaList from '../../shared/components/media-list/MediaList.js';

export default class MainPage extends HTMLElement{

    constructor(){
        super();
        let shadow = this.attachShadow({mode : 'open'});
        shadow.innerHTML = `
            <top-trending-midia></top-trending-midia>
            <media-list data-title="Trending Movies" data-search="movie/week"></media-list>
            <media-list data-title="Trending Tvs" data-search="tv/week"></media-list>
        `;
    };
};

customElements.define('main-page', MainPage);