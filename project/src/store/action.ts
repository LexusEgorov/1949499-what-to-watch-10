import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { Comments } from '../types/comments';
import Film from '../types/film';
import Films from '../types/films';
import { UserData } from '../types/user-data';

const GenreAction = {
  SET: createAction<{genre: string}>('genre/set'),
};

const FilmsAction = {
  SET_CURRENT: createAction<{currentFilm: Film}>('films/set-current'),
  SET_CURRENT_COMMENTS: createAction<{currentFilmComments: Comments}>('films/set-current-comments'),
  LOAD: createAction<Films>('films/load'),
  LOAD_PROMO: createAction<Film>('films/load-promo'),
  LOAD_FAVORITE: createAction<Films>('films/load-favorite'),
  LOAD_SIMILAR: createAction<Films>('films/load-similar'),
};

const AppAction = {
  SET_FILMS_LOADED_STATUS: createAction<boolean>('app/set-films-loaded-status'),
  SET_FAVORITE_FILMS_LOADED_STATUS: createAction<boolean>('app/set-favorite-films-loaded-status'),
  SET_PROMO_FILM_LOADED_STATUS: createAction<boolean>('app/set-promo-film-loaded-status'),
  SET_AUTHORIZATION_STATUS: createAction<string>('app/set-authorization-status'),
  REDIRECT_TO_ROUTE: createAction<AppRoute>('app/redirect-to-route'),
  SET_USER: createAction<UserData>('app/set-user'),
};

const Action = {
  GENRE: GenreAction,
  FILMS: FilmsAction,
  APP: AppAction,
};

export {Action};
