import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import Film from '../types/film';
import Films from '../types/films';
import { UserData } from '../types/user-data';
import { Action } from './action';

type InitialState = {
  currentGenre: string,
  currentFilm: Film,
  promoFilm: Film,
  films: Films,
  favoriteFilms: Films,
  isFilmsLoaded: boolean,
  isPromoFilmLoaded: boolean,
  isFavoriteFilmsLoaded: boolean,
  authorizationStatus: string,
  userData: UserData,
}

const initialState : InitialState = {
  currentGenre: 'All genres',
  currentFilm: {} as Film,
  promoFilm: {} as Film,
  films: [],
  favoriteFilms: [],
  isFilmsLoaded: false,
  isPromoFilmLoaded: false,
  isFavoriteFilmsLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {} as UserData,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Action.APP.SET_FILMS_LOADED_STATUS, (state, action) => {
      state.isFilmsLoaded = action.payload;
    })
    .addCase(Action.APP.SET_PROMO_FILM_LOADED_STATUS, (state, action) => {
      state.isPromoFilmLoaded = action.payload;
    })
    .addCase(Action.APP.SET_FAVORITE_FILMS_LOADED_STATUS, (state, action) => {
      state.isFavoriteFilmsLoaded = action.payload;
    })
    .addCase(Action.APP.SET_AUTHORIZATION_STATUS, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(Action.GENRE.SET, (state, action) => {
      state.currentGenre = action.payload.genre;
    })
    .addCase(Action.FILMS.SET_CURRENT, (state, action) => {
      const findedFilm = state.films.find((film) => film.id === action.payload.currentFilm);
      state.currentFilm = findedFilm ? findedFilm : {} as Film;
    })
    .addCase(Action.FILMS.LOAD, (state, action) => {
      state.films = action.payload;
    })
    .addCase(Action.FILMS.LOAD_PROMO, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(Action.FILMS.LOAD_FAVORITE, (state, action) => {
      state.favoriteFilms = action.payload;
    });
});

export default reducer;
