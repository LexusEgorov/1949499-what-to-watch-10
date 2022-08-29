import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';

import FISH_FILMS from './fish/films';
import { store } from './store/store';

const promoFilm = {
  name: 'The Grand Budapest Hotel',
  date: 2014,
  genre: 'Drama',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App promoFilm={promoFilm} films={FISH_FILMS}/>
    </Provider>
  </React.StrictMode>
);
