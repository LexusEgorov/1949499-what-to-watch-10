import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const FISH_FILMS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

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
