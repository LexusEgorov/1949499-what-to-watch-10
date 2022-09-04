import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { filmsData } from './films-data/films-data';
import { genresData } from './genres-data/genres-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Genre] : genresData.reducer,
  [NameSpace.Film] : filmsData.reducer,
});
