import MainPage from "./pages/main-page/main-page.js";

const app = document.querySelector('router-outlet');
const routes = {
    '/index.html': '<main-page></main-page>',
    //transferir para routes
    '/details': '<details-page></details-page>'
}

app.innerHTML = routes[window.location.pathname];

export const onNavigate = (pathName) => {
    window.history.pushState(
        {}, 
        pathName, 
        window.location.origin + pathName
    );
    console.log(routes);
    app.innerHTML = routes[pathName];
};

window.onpopstate = () => {  
    app.innerHTML = routes[window.location.pathname];
};
