import { createReducer } from '@reduxjs/toolkit';
import { Action } from './action';

const initialState = {
  currentGenre: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Action.INIT, (state) => {
      state.currentGenre = 'All genres';
    })
    .addCase(Action.GENRE.SET, (state, action) => {
      state.currentGenre = action.payload.genre;
    });
});

export default reducer;
