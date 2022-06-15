import NavBar from './nav-bar.js';
import MainPage from '../../../pages/main-page.js';
jest.mock('./nav-bar.js');

beforeEach(() => {
    NavBar.mockClear();
});

it('Constructor has been called', () => {
    const navBarConsumer = new MainPage();
    expect(NavBar).toHaveBeenCalledTimes(1);
});