import NavBar from './shared/components/nav-bar/NavBar.js';
import PageManager from './pages/PageManager.js';

const app = document.querySelector('app');

app.innerHTML = `
    <nav-bar></nav-bar>
    <page-manager></page-manager>
`;