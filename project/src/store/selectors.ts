import { createSelector } from 'reselect';
import { DEFAULT_FILTER } from '../const';
import { State } from '../types/types';

export const selectFilms = (state : State) => state.films;

export const selectCurrentFilm = (state: State) => state.currentFilm;

export const selectCurrentGenre = (state: State) => state.currentGenre;

export const selectFilteredFilms = createSelector(
  [selectFilms, selectCurrentGenre, selectCurrentFilm],
  (films, currentGenre, currentFilm) => {
    if(currentFilm.id){
      return films.filter((film) => film.genre === currentFilm.genre && film !== currentFilm).slice(0, 4);
    }

    if(currentGenre === DEFAULT_FILTER){
      return films;
    }

    return films.filter((film) => film.genre === currentGenre);
  },
);
