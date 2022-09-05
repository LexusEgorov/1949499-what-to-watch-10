import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-route/history-route';
import App from './app';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    authorizationStatus: 'NO_AUTH',
    userData: {}
  },
  APP: {
    isLoading: false,
    isError: false,
    isNotFound: false
  },
  GENRE: {
    currentGenre: 'All genres'
  },
  FILM: {
    currentFilm: {},
    currentFilmComments: [],
    similarFilms: [],
    films: [],
    favoriteFilms: [],
    promoFilm: {},
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App routing', () => {
  it('should render "SignIn Page" when user navigate to /login', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "Main Page" when user navigate to /', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to /mylist', () => {
    history.push(AppRoute.MyList);
    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });
  it('should render "Film Page" when user navigate to /films/:id', () => {
    history.push(`${AppRoute.Films}/2`);
    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
  });

  it('should render "Error Page" when user navigate to /error', () => {
    history.push(AppRoute.Error);
    render(fakeApp);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
  it('should render "404 Page" when user navigate to /404', () => {
    history.push(AppRoute.NotFound);
    render(fakeApp);

    expect(screen.getByText(/404 Page not found/i)).toBeInTheDocument();
  });
});
