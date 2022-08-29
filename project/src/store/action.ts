import { createAction } from '@reduxjs/toolkit';
import Film from '../types/film';
import Films from '../types/films';

const GenreAction = {
  SET: createAction<{genre: string}>('genre/set'),
};

const FilmsAction = {
  SET_CURRENT: createAction<{currentFilm: number}>('films/set-current'),
  LOAD: createAction<Films>('films/load'),
  LOAD_PROMO: createAction<Film>('films/load-promo'),
};

const AppAction = {
  SET_FILMS_LOADED_STATUS: createAction<boolean>('app/set-films-loaded-status'),
  SET_PROMO_FILM_LOADED_STATUS: createAction<boolean>('app/set-promo-film-loaded-status'),
};

const Action = {
  INIT: createAction('app/init'),
  GENRE: GenreAction,
  FILMS: FilmsAction,
  APP: AppAction,
};

export {Action};
