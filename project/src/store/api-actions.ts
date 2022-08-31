import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { CommentData } from '../types/comment-data';
import { Comments } from '../types/comments';
import Film from '../types/film';
import Films from '../types/films';
import { StatusData } from '../types/status-data';
import { AppDispatchType, State } from '../types/types';
import { UserData } from '../types/user-data';
import { Action } from './action';

const ERROR_CODE = -1;

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load',
  async (_arg, {dispatch, extra: api}) => {
    try{
      dispatch(Action.APP.SET_FILMS_LOADED_STATUS(true));
      const {data} = await api.get<Films>(APIRoute.Films);
      dispatch(Action.FILMS.LOAD(data));
      dispatch(Action.APP.SET_FILMS_LOADED_STATUS(false));
    } catch {
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.Error));
      dispatch(Action.APP.SET_FILMS_LOADED_STATUS(false));
    }
  }
);

export const fetchFilmAction = createAsyncThunk<void, number, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'film/load',
  async (id, {dispatch, extra: api}) => {
    try{
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      dispatch(Action.FILMS.SET_CURRENT({currentFilm: data}));
    } catch {
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.NotFound));
    }
  }
);

export const fetchFilmCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'film/load',
  async (id, {dispatch, extra: api}) => {
    try{
      const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      dispatch(Action.FILMS.SET_CURRENT_COMMENTS({currentFilmComments: data}));
    } catch {
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.Error));
    }
  }
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load-promo',
  async (_arg, {dispatch, extra: api}) => {
    try{
      dispatch(Action.APP.SET_PROMO_FILM_LOADED_STATUS(true));
      const {data} = await api.get<Film>(APIRoute.Promo);
      dispatch(Action.FILMS.LOAD_PROMO(data));
      dispatch(Action.APP.SET_PROMO_FILM_LOADED_STATUS(false));
    } catch {
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.Error));
      dispatch(Action.APP.SET_PROMO_FILM_LOADED_STATUS(false));
    }
  }
);

export const fetchFavoriteAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load-favorite',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(Action.APP.SET_FAVORITE_FILMS_LOADED_STATUS(true));
      const {data} = await (await api.get<Films>(APIRoute.Favorite,));
      dispatch(Action.FILMS.LOAD_FAVORITE(data));
      dispatch(Action.APP.SET_FAVORITE_FILMS_LOADED_STATUS(false));
    } catch {
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.Error));
      dispatch(Action.APP.SET_FAVORITE_FILMS_LOADED_STATUS(false));
    }
  }
);

export const fetchSimilarAction = createAsyncThunk<void, number, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'film/load-similar',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
    dispatch(Action.FILMS.LOAD_SIMILAR(data));
  }
);

export const changeFilmStatus = createAsyncThunk<void, StatusData, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'film/changeStatus',
  async ({filmId, filmStatus}, {dispatch, extra: api}) => {
    try{
      const status = filmStatus ? 1 : 0;
      await api.post<Film>(`${APIRoute.Favorite}/${filmId}/${status}`);
      dispatch(fetchFavoriteAction());
      dispatch(fetchFilmsAction());
      dispatch(fetchPromoFilmAction());
    } catch {
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.Error));
    }
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
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(Action.APP.SET_USER(data));
      dispatch(fetchFavoriteAction());
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
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);

      dispatch(Action.APP.SET_AUTHORIZATION_STATUS(AuthorizationStatus.Auth));
      dispatch(Action.APP.SET_USER(data));
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

export const sendCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/send-comment',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    try {
      await api.post(`${APIRoute.Comments}/${filmId}`, ({comment, rating}));
      dispatch(Action.APP.REDIRECT_TO_ROUTE(`${AppRoute.Films}/${filmId}` as AppRoute));
    } catch {
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.Error));
    }
  }
);


