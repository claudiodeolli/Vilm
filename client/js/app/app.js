import Routes from "./Routes.js";

const routes = new Routes();
const pathName = window.location.pathname + window.location.search;

routes.onNavigate(pathName);