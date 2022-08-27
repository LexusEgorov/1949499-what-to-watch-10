import { DEFAULT_FILTER } from '../const';
import Films from '../types/films';
import { State } from '../types/types';

export const getFilteredFilms = (state: State) : Films => {
  const {films, currentGenre, currentFilm} = state;
  if(currentFilm.id){
    return films.filter((film) => film.genre === currentFilm.genre && film !== currentFilm).slice(0,4);
  }

  if(currentGenre === DEFAULT_FILTER){
    return films;
  }

  return films.filter((film) => film.genre === currentGenre);
};
