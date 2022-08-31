import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import Film from '../types/film';
import Films from '../types/films';

const GenreAction = {
  SET: createAction<{genre: string}>('genre/set'),
};

const FilmsAction = {
  SET_CURRENT: createAction<{currentFilm: number}>('films/set-current'),
  LOAD: createAction<Films>('films/load'),
  LOAD_PROMO: createAction<Film>('films/load-promo'),
  LOAD_FAVORITE: createAction<Films>('films/load-favorite'),
};

const AppAction = {
  SET_FILMS_LOADED_STATUS: createAction<boolean>('app/set-films-loaded-status'),
  SET_FAVORITE_FILMS_LOADED_STATUS: createAction<boolean>('app/set-favorite-films-loaded-status'),
  SET_PROMO_FILM_LOADED_STATUS: createAction<boolean>('app/set-promo-film-loaded-status'),
  SET_AUTHORIZATION_STATUS: createAction<string>('app/set-authorization-status'),
  REDIRECT_TO_ROUTE: createAction<AppRoute>('app/redirect-to-route'),
};

const Action = {
  GENRE: GenreAction,
  FILMS: FilmsAction,
  APP: AppAction,
};

export {Action};
