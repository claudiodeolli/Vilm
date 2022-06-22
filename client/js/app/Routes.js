import MainPage from "./pages/main-page/main-page.js";
import DetailsPage from "./pages/details-page/DetailsPage.js";

export default class Routes{

    #routes;
    #template;

    constructor(){

        this.#routes = {
            '/': `<main-page></main-page>`,            
        };
        this.#template = document.querySelector('router-outlet');
        this.#onInit();
    };

    #onInit(){

        window.onpopstate = () => { 
            let pathName = window.location.pathname + window.location.search;
            this.onNavigate(pathName);
        };
    };

    addRoute(route){

        Object.assign(this.#routes, route);
    };

    onNavigate(pathName){
        window.history.pushState(
            {}, 
            pathName, 
            window.location.origin + pathName
        );
        this.#template.innerHTML = this.#routes[pathName];
        console.log(this.#template.innerHTML);
        console.log(this.#routes);
    };
}