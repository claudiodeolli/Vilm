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
    };
}