import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import Film from '../types/film';
import Films from '../types/films';
import { AppDispatchType, State } from '../types/types';
import { UserData } from '../types/user-data';
import { Action } from './action';

const ERROR_CODE = -1;

export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(Action.APP.SET_FILMS_LOADED_STATUS(true));
    const {data} = await api.get<Films>(APIRoute.Films);
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
    dispatch(Action.APP.SET_PROMO_FILM_LOADED_STATUS(true));
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(Action.FILMS.LOAD_PROMO(data));
    dispatch(Action.APP.SET_PROMO_FILM_LOADED_STATUS(false));
  }
);

export const fetchFavoriteAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load-favorite',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(Action.APP.SET_FAVORITE_FILMS_LOADED_STATUS(true));
    const {data} = await (await api.get<Films>(APIRoute.Favorite,));
    dispatch(Action.FILMS.LOAD_FAVORITE(data));
    dispatch(Action.APP.SET_FAVORITE_FILMS_LOADED_STATUS(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'app/set-authorization-status',
  async(_arg, {dispatch, extra: api}) => {
    try{
      await api.get(APIRoute.Login);
      dispatch(Action.APP.SET_AUTHORIZATION_STATUS(AuthorizationStatus.Auth));
    } catch {
      dispatch(Action.APP.SET_AUTHORIZATION_STATUS(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<number | void, AuthData, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'app/set-authorization-status',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);

      dispatch(Action.APP.SET_AUTHORIZATION_STATUS(AuthorizationStatus.Auth));
      dispatch(fetchFavoriteAction());
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.Root));
    } catch {
      return ERROR_CODE;
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'app/set-authorization-status',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(Action.APP.SET_AUTHORIZATION_STATUS(AuthorizationStatus.NoAuth));
  }
);


