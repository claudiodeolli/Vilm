import MainPage from "./pages/main-page/main-page.js";

const app = document.querySelector('router-outlet');
const routes = { '/': '<main-page></main-page>' };

app.innerHTML = routes[window.location.pathname];