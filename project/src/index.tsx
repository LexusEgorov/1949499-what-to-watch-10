import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App promoFilmName='The Grand Budapest Hotel' promoFilmDate='2014' promoFilmGenre='Drama'/>
  </React.StrictMode>,
);
