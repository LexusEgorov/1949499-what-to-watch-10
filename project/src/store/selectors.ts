import { DEFAULT_FILTER, SIMILAR_FILMS_COUNT } from '../const';
import Films from '../types/films';
import { State } from '../types/types';

export const getFilteredFilms = (state: State) : Films => {
  const {films, currentGenre, currentFilm, currentFilmSimilar} = state;
  if(currentFilm.id){
    return currentFilmSimilar.filter((film) => film.id !== currentFilm.id).slice(0, SIMILAR_FILMS_COUNT);
  }

  if(currentGenre === DEFAULT_FILTER){
    return films;
  }

  return films.filter((film) => film.genre === currentGenre);
};
