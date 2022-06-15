export default class NavBar extends HTMLElement{

    constructor(){
        super();
        let shadow = this.attachShadow({mode : 'open'});
    };
};

customElements.define('nav-bar', NavBar);