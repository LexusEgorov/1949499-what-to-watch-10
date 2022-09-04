import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
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

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    return data;
  }
);

export const fetchFilmAction = createAsyncThunk<Film, number, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'film/load-film',
  async (id, { extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
    return data;
  }
);

export const fetchFilmCommentsAction = createAsyncThunk<Comments, number, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'film/load-comments',
  async (id, { extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const fetchPromoFilmAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load-promo',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    return data;
  }
);

export const fetchFavoriteAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'films/load-favorite',
  async (_arg, {extra: api}) => {
    const {data} = await (await api.get<Films>(APIRoute.Favorite,));
    return data;
  }
);

export const fetchSimilarAction = createAsyncThunk<Films, number, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'film/load-similar',
  async (id, { extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
    return data;
  }
);

export const changeFilmStatus = createAsyncThunk<void, StatusData, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'film/change-status',
  async ({filmId, filmStatus}, {dispatch, extra: api}) => {
    const status = filmStatus ? 1 : 0;
    await api.post<Film>(`${APIRoute.Favorite}/${filmId}/${status}`);
    dispatch(fetchFavoriteAction());
    dispatch(fetchFilmsAction());
    dispatch(fetchPromoFilmAction());
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'user/check-auth',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.Root));
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: State,
  extra: AxiosInstance,
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
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


