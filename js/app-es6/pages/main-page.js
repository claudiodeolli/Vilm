import NavBar from '../shared/components/nav-bar/nav-bar.js';

export default class MainPage extends HTMLElement{

    constructor(){
        super();
        let shadow = this.attachShadow({mode : 'open'});
        shadow.innerHTML = `
            <nav-bar></nav-bar>
        `;
    };
};

customElements.define('main-page', MainPage);