import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/types';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { APIRoute } from '../const';
import { changeFilmStatus, checkAuthAction, fetchFavoriteAction, fetchFilmAction, fetchFilmCommentsAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarAction, loginAction, logoutAction, sendCommentAction } from './api-actions';
import { Action } from 'redux';
import {Action as AppAction } from './action';
import { createFakeFilmComment, createFakeFilmData } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is "AUTH" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should authorization status is "NO_AUTH" when server return 401', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(401, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type,
    ]);
  });

  it('should saveToken() and redirect-to-route when POST /login', async () => {
    const fakeUser = {login: 'asd@mail.ru', password: 'a1'};
    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'token'});

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      AppAction.APP.REDIRECT_TO_ROUTE.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch-token', 'token');
  });

  it('should dispatch logout and dropToken() when DELETE /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('what-to-watch-token');
  });

  it('should dispatch loadFilms when GET /films', async () => {
    const mockFilms = [createFakeFilmData(), createFakeFilmData()];
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadSimilar when GET /films/:id/similar', async () => {
    const mockFilms = [createFakeFilmData(), createFakeFilmData()];
    const id = 5;
    mockAPI
      .onGet(`${APIRoute.Films}/${id}/similar`)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarAction(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarAction.pending.type,
      fetchSimilarAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadFilm when GET /films/:id', async () => {
    const mockFilm = createFakeFilmData();
    const id = 5;
    mockAPI
      .onGet(`${APIRoute.Films}/${id}`)
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmAction(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadPromoFilm when GET /promo', async () => {
    const mockFilm = createFakeFilmData();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoFilmAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoFilmAction.pending.type,
      fetchPromoFilmAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadFavoriteAction when GET /favorite', async () => {
    const mockFilms = [createFakeFilmData()];
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteAction.pending.type,
      fetchFavoriteAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadComments when GET /comments/:id', async () => {
    const mockComments = [createFakeFilmComment()];
    const id = 5;
    mockAPI
      .onGet(`${APIRoute.Comments}/${id}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchFilmCommentsAction(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmCommentsAction.pending.type,
      fetchFilmCommentsAction.fulfilled.type,
    ]);
  });

  it('should dispatch redirect when POST /comments/:id fulfilled', async () => {
    const fakeComment = createFakeFilmComment();
    const id = 5;
    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(sendCommentAction({...fakeComment, filmId: id}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      AppAction.APP.REDIRECT_TO_ROUTE.type,
      sendCommentAction.fulfilled.type,
    ]);
  });

  it('should dispatch redirect when POST /comments/:id rejected', async () => {
    const fakeComment = createFakeFilmComment();
    const id = 5;

    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`)
      .reply(401);

    const store = mockStore();

    await store.dispatch(sendCommentAction({...fakeComment, filmId: id}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      AppAction.APP.REDIRECT_TO_ROUTE.type,
      sendCommentAction.fulfilled.type,
    ]);
  });

  it('should dispatch changeStatus, loadFavorite, loadFilms, loadPromo when POST /favorite/:id/:status', async () => {
    const id = 5;
    const filmStatus = true;
    const status = 1;
    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${status}`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(changeFilmStatus({filmId: id, filmStatus}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFilmStatus.pending.type,
      fetchFavoriteAction.pending.type,
      fetchFilmsAction.pending.type,
      fetchPromoFilmAction.pending.type,
      changeFilmStatus.fulfilled.type,
    ]);
  });
});
