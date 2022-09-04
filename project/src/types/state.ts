import { Comments } from './comments';
import Film from './film';
import Films from './films';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: string,
  userData: UserData,
};

export type AppProcess = {
  isLoading: boolean,
  isError: boolean,
  isNotFound: boolean,
};

export type FilmsData = {
  currentFilm: Film,
  currentFilmComments: Comments,
  similarFilms: Films,
  films: Films,
  favoriteFilms: Films,
  promoFilm: Film,
};

export type GenresData = {
  currentGenre: string,
};
