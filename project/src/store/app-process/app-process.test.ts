import { AppProcess } from '../../types/state';
import { fetchFavoriteAction, fetchFilmAction, fetchFilmCommentsAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarAction, sendCommentAction } from '../api-actions';
import { appProcess, resetError } from './app-process';

describe('Reducer: app', () => {
  let state: AppProcess;

  beforeEach(() => {
    state = {
      isError: false,
      isLoading: false,
      isNotFound: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isError: false,
        isLoading: false,
        isNotFound: false,
      });
  });

  describe('fetchFilmsAction test', () => {
    it('should update isLoading to "true" if fetchFilmsAction pending', () => {
      expect(appProcess.reducer(state, {type: fetchFilmsAction.pending.type}))
        .toEqual({
          isError: false,
          isLoading: true,
          isNotFound: false,
        });
    });

    it('should update isLoading to "false" if fetchFilmsAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchFilmsAction.fulfilled.type}))
        .toEqual({
          isError: false,
          isLoading: false,
          isNotFound: false,
        });
    });

    it('should update: isLoading to "false", isError to "true" if fetchFilmsAction rejected', () => {
      expect(appProcess.reducer(state, {type: fetchFilmsAction.rejected.type}))
        .toEqual({
          isError: true,
          isLoading: false,
          isNotFound: false,
        });
    });
  });

  describe('fetchFilmAction test', () => {
    it('should update isLoading to "true" if fetchFilmAction pending', () => {
      expect(appProcess.reducer(state, {type: fetchFilmAction.pending.type}))
        .toEqual({
          isError: false,
          isLoading: true,
          isNotFound: false,
        });
    });

    it('should update isLoading to "false" if fetchFilmAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchFilmAction.fulfilled.type}))
        .toEqual({
          isError: false,
          isLoading: false,
          isNotFound: false,
        });
    });

    it('should update: isLoading to "false", isNotFound to "true" if fetchFilmAction rejected', () => {
      expect(appProcess.reducer(state, {type: fetchFilmAction.rejected.type}))
        .toEqual({
          isError: false,
          isLoading: false,
          isNotFound: true,
        });
    });
  });

  describe('fetchFilmCommentsAction test', () => {
    it('should update isLoading to "true" if fetchFilmCommentsAction pending', () => {
      expect(appProcess.reducer(state, {type: fetchFilmCommentsAction.pending.type}))
        .toEqual({
          isError: false,
          isLoading: true,
          isNotFound: false,
        });
    });

    it('should update isLoading to "false" if fetchFilmAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchFilmCommentsAction.fulfilled.type}))
        .toEqual({
          isError: false,
          isLoading: false,
          isNotFound: false,
        });
    });

    it('should update: isLoading to "false", isError to "true" if fetchFilmAction rejected', () => {
      expect(appProcess.reducer(state, {type: fetchFilmCommentsAction.rejected.type}))
        .toEqual({
          isError: true,
          isLoading: false,
          isNotFound: false,
        });
    });
  });

  describe('fetchPromoFilmAction test', () => {
    it('should update isLoading to "true" if fetchPromoFilmAction pending', () => {
      expect(appProcess.reducer(state, {type: fetchPromoFilmAction.pending.type}))
        .toEqual({
          isError: false,
          isLoading: true,
          isNotFound: false,
        });
    });

    it('should update isLoading to "false" if fetchPromoFilmAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchPromoFilmAction.fulfilled.type}))
        .toEqual({
          isError: false,
          isLoading: false,
          isNotFound: false,
        });
    });

    it('should update: isLoading to "false", isError to "true" if fetchPromoFilmAction rejected', () => {
      expect(appProcess.reducer(state, {type: fetchPromoFilmAction.rejected.type}))
        .toEqual({
          isError: true,
          isLoading: false,
          isNotFound: false,
        });
    });
  });

  describe('fetchFavoriteAction test', () => {
    it('should update isLoading to "true" if fetchFavoriteAction pending', () => {
      expect(appProcess.reducer(state, {type: fetchFavoriteAction.pending.type}))
        .toEqual({
          isError: false,
          isLoading: true,
          isNotFound: false,
        });
    });

    it('should update isLoading to "false" if fetchFavoriteAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchFavoriteAction.fulfilled.type}))
        .toEqual({
          isError: false,
          isLoading: false,
          isNotFound: false,
        });
    });

    it('should update: isLoading to "false", isError to "true" if fetchFavoriteAction rejected', () => {
      expect(appProcess.reducer(state, {type: fetchFavoriteAction.rejected.type}))
        .toEqual({
          isError: true,
          isLoading: false,
          isNotFound: false,
        });
    });
  });

  describe('fetchSimilarAction test', () => {
    it('should update isLoading to "true" if fetchSimilarAction pending', () => {
      expect(appProcess.reducer(state, {type: fetchSimilarAction.pending.type}))
        .toEqual({
          isError: false,
          isLoading: true,
          isNotFound: false,
        });
    });

    it('should update isLoading to "false" if fetchSimilarAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchSimilarAction.fulfilled.type}))
        .toEqual({
          isError: false,
          isLoading: false,
          isNotFound: false,
        });
    });

    it('should update: isLoading to "false", isError to "true" if fetchSimilarAction rejected', () => {
      expect(appProcess.reducer(state, {type: fetchSimilarAction.rejected.type}))
        .toEqual({
          isError: true,
          isLoading: false,
          isNotFound: false,
        });
    });
  });

  describe('sendCommentAction test', () => {
    it('should update isLoading to "true" if sendCommentAction pending', () => {
      expect(appProcess.reducer(state, {type: sendCommentAction.pending.type}))
        .toEqual({
          isError: false,
          isLoading: true,
          isNotFound: false,
        });
    });

    it('should update isLoading to "false" if sendCommentAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: sendCommentAction.fulfilled.type}))
        .toEqual({
          isError: false,
          isLoading: false,
          isNotFound: false,
        });
    });

    it('should update: isLoading to "false", isError to "true" if sendCommentAction rejected', () => {
      expect(appProcess.reducer(state, {type: sendCommentAction.rejected.type}))
        .toEqual({
          isError: true,
          isLoading: false,
          isNotFound: false,
        });
    });
  });

  describe('resetError test', () => {
    it('should update: isLoading to "false", isError to "false"', () => {
      expect(appProcess.reducer(state, {type: resetError.type}))
        .toEqual({
          isError: false,
          isLoading: false,
          isNotFound: false,
        });
    });
  });
});
