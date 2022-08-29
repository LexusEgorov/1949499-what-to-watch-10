import { createReducer } from '@reduxjs/toolkit';
import FISH_FILMS from '../fish/films';
import Film from '../types/film';
import Films from '../types/films';
import { Action } from './action';

const initialState = {
  currentGenre: '',
  currentFilm: {} as Film,
  films: [] as Films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Action.INIT, (state) => {
      state.currentGenre = 'All genres';
      state.films = FISH_FILMS;
    })
    .addCase(Action.GENRE.SET, (state, action) => {
      state.currentGenre = action.payload.genre;
    })
    .addCase(Action.FILM.SET_CURRENT, (state, action) => {
      const findedFilm = state.films.find((film) => film.id === action.payload.currentFilm);
      state.currentFilm = findedFilm ? findedFilm : {} as Film;
    });
});

export default reducer;
