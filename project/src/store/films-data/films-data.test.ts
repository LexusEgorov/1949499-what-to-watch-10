import Film from '../../types/film';
import { FilmsData } from '../../types/state';
import { createFakeFilmComment, createFakeFilmData } from '../../utils/mocks';
import { fetchFavoriteAction, fetchFilmAction, fetchFilmCommentsAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarAction } from '../api-actions';
import { filmsData, resetCurrentFilm } from './films-data';

describe('Reducer: films', () => {
  let state: FilmsData;
  const fakeFilm = createFakeFilmData();
  const fakeFilmComment = createFakeFilmComment();

  beforeEach(() => {
    state = {
      currentFilm: {} as Film,
      currentFilmComments: [],
      similarFilms: [],
      films: [],
      favoriteFilms: [],
      promoFilm: {} as Film,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentFilm: {},
        currentFilmComments: [],
        similarFilms: [],
        films: [],
        favoriteFilms: [],
        promoFilm: {},
      });
  });
  describe('fetchFilmAction test', () => {
    it('should update currentFilm to <Film> if fetchFilmAction fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchFilmAction.fulfilled.type, payload: fakeFilm}))
        .toEqual({
          currentFilm: fakeFilm,
          currentFilmComments: [],
          similarFilms: [],
          films: [],
          favoriteFilms: [],
          promoFilm: {},
        });
    });
  });
  describe('fetchFilmCommentsAction test', () => {
    it('should update currentFilmComments to [<Comment>] if fetchFilmCommentsAction fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchFilmCommentsAction.fulfilled.type, payload: [fakeFilmComment]}))
        .toEqual({
          currentFilm: {},
          currentFilmComments: [fakeFilmComment],
          similarFilms: [],
          films: [],
          favoriteFilms: [],
          promoFilm: {},
        });
    });
  });
  describe('fetchSimilarAction test', () => {
    it('should update similarFilms to [<Film>] if fetchSimilarAction fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchSimilarAction.fulfilled.type, payload: [fakeFilm]}))
        .toEqual({
          currentFilm: {},
          currentFilmComments: [],
          similarFilms: [fakeFilm],
          films: [],
          favoriteFilms: [],
          promoFilm: {},
        });
    });
  });
  describe('fetchFilmsAction test', () => {
    it('should update films to [<Film>] if fetchFilmsAction fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchFilmsAction.fulfilled.type, payload: [fakeFilm]}))
        .toEqual({
          currentFilm: {},
          currentFilmComments: [],
          similarFilms: [],
          films: [fakeFilm],
          favoriteFilms: [],
          promoFilm: {},
        });
    });
  });
  describe('fetchFavoriteAction test', () => {
    it('should update favoriteFilms to [<Film>] if fetchFavoriteAction fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchFavoriteAction.fulfilled.type, payload: [fakeFilm]}))
        .toEqual({
          currentFilm: {},
          currentFilmComments: [],
          similarFilms: [],
          films: [],
          favoriteFilms: [fakeFilm],
          promoFilm: {},
        });
    });
  });
  describe('fetchPromoFilmAction test', () => {
    it('should update promoFilm to <Film> if fetchPromoFilmAction fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchPromoFilmAction.fulfilled.type, payload: fakeFilm}))
        .toEqual({
          currentFilm: {},
          currentFilmComments: [],
          similarFilms: [],
          films: [],
          favoriteFilms: [],
          promoFilm: fakeFilm,
        });
    });
  });

  describe('resetCurrentFilm test', () => {
    it('should update: currentFilm to {}', () => {
      expect(filmsData.reducer(state, {type: resetCurrentFilm.type}))
        .toEqual({
          currentFilm: {},
          currentFilmComments: [],
          similarFilms: [],
          films: [],
          favoriteFilms: [],
          promoFilm: {},
        });
    });
  });

});
