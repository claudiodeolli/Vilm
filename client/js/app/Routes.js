export class Routes{

    #routes;
    #template;

    constructor(routes){

        this.#routes = routes;
        this.#template = document.querySelector('router-outlet');
        this.#onInit();
    };

    #onInit(){

        window.onpopstate = () => {
            this.#template.innerHTML = this.#routes[window.location.pathname];
        };
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