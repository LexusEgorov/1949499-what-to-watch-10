import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchFavoriteAction, fetchFilmAction, fetchFilmCommentsAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarAction, sendCommentAction } from '../api-actions';
import { AppProcess } from '../../types/state';

const initialState : AppProcess = {
  isLoading: false,
  isError: false,
  isNotFound: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers : {
    resetError: (state) => {
      state.isError = false;
      state.isNotFound = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isNotFound = true;
        state.isLoading = false;
      })
      .addCase(fetchFilmCommentsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmCommentsAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFilmCommentsAction.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchSimilarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSimilarAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSimilarAction.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendCommentAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const {resetError} = appProcess.actions;
