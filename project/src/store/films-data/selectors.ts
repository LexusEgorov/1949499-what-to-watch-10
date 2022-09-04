import { DEFAULT_FILTER, NameSpace, SIMILAR_FILMS_COUNT } from '../../const';
import { Comments } from '../../types/comments';
import Film from '../../types/film';
import Films from '../../types/films';
import { State } from '../../types/types';

export const getCurrentFilm = (state : State) : Film => state[NameSpace.Film].currentFilm;

export const getCurrentFilmComments = (state: State) : Comments => state[NameSpace.Film].currentFilmComments;

export const getSimilarFilms = (state: State) : Films => state[NameSpace.Film].similarFilms;

export const getPromoFilm = (state: State) : Film => state[NameSpace.Film].promoFilm;

export const getFilms = (state: State) : Films => state[NameSpace.Film].films;

export const getFavoriteFilms = (state: State) : Films => state[NameSpace.Film].favoriteFilms;

export const getFilteredFilms = (state: State) : Films => {
  const currentGenre = state[NameSpace.Genre].currentGenre;
  const films = state[NameSpace.Film].films;
  const currentFilm = state[NameSpace.Film].currentFilm;
  const similarFilms = state[NameSpace.Film].similarFilms;

  if(currentFilm.id){
    return similarFilms.filter((film) => film.id !== currentFilm.id).slice(0, SIMILAR_FILMS_COUNT);
  }

  if(currentGenre === DEFAULT_FILTER){
    return films;
  }

  return films.filter((film) => film.genre === currentGenre);
};
