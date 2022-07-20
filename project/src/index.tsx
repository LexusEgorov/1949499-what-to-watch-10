import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import FISH_FILMS from './fish/films';

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
    <App promoFilm={promoFilm} films={FISH_FILMS}/>
  </React.StrictMode>
);
