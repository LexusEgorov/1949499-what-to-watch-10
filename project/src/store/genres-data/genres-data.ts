import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GenresData } from '../../types/state';

const initialState : GenresData = {
  currentGenre: 'All genres',
};

export const genresData = createSlice({
  name: NameSpace.Genre,
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.currentGenre = action.payload;
    },

    resetGenre: (state) => {
      state.currentGenre = 'All genres';
    },
  },
});

export const {setGenre, resetGenre} = genresData.actions;
