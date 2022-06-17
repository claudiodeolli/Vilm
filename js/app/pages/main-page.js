import NavBar from '../shared/components/nav-bar/NavBar.js';
import TopTrendingMidia from '../shared/components/top-trending-midia/TopTrendingMidia.js';

export default class MainPage extends HTMLElement{

    constructor(){
        super();
        let shadow = this.attachShadow({mode : 'open'});
        shadow.innerHTML = `
            <nav-bar></nav-bar>
            <top-trending-midia></top-trending-midia>
        `;
    };
};

customElements.define('main-page', MainPage);