import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import Film from '../../types/film';
import { FilmsData } from '../../types/state';
import { fetchFavoriteAction, fetchFilmAction, fetchFilmCommentsAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarAction } from '../api-actions';

const initialState : FilmsData = {
  currentFilm: {} as Film,
  currentFilmComments: [],
  similarFilms: [],
  films: [],
  favoriteFilms: [],
  promoFilm: {} as Film,
};

export const filmsData = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    resetCurrentFilm: (state) => {
      state.currentFilm = {} as Film;
      state.currentFilmComments = [];
      state.similarFilms = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
      })
      .addCase(fetchFilmCommentsAction.fulfilled, (state, action) => {
        state.currentFilmComments = action.payload;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      });
  },
});

export const {resetCurrentFilm} = filmsData.actions;
