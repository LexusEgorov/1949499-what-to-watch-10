import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import Film from '../types/film';
import Films from '../types/films';
import { AppDispatchType, State } from '../types/types';
import { Action } from './action';

export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(Action.APP.SET_FILMS_LOADED_STATUS(true));
    dispatch(Action.FILMS.LOAD(data));
    dispatch(Action.APP.SET_FILMS_LOADED_STATUS(false));
  }
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load-promo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(Action.APP.SET_PROMO_FILM_LOADED_STATUS(true));
    dispatch(Action.FILMS.LOAD_PROMO(data));
    dispatch(Action.APP.SET_PROMO_FILM_LOADED_STATUS(false));
  }
);
