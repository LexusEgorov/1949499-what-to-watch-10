import { createAction } from '@reduxjs/toolkit';

const GenreAction = {
  SET: createAction<{genre: string}>('genre/set'),
};

const FilmAction = {
  SET_CURRENT: createAction<{currentFilm: number}>('film/set'),
};

const Action = {
  INIT: createAction('app/init'),
  GENRE: GenreAction,
  FILM: FilmAction,
};

export {Action};
