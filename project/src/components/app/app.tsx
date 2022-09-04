import {Route, Routes} from 'react-router-dom';
import Layout from '../../pages/layout/layout';
import MainScreen from '../../pages/main-screen/main-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddRewiewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getIsError, getIsLoading, getIsNotFound } from '../../store/app-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { useEffect } from 'react';
import { checkAuthAction, fetchFilmsAction, fetchPromoFilmAction } from '../../store/api-actions';
import { Action } from '../../store/action';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isUnknown = authorizationStatus === AuthorizationStatus.Unknown;

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchFilmsAction());
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  const isLoading = useAppSelector(getIsLoading);
  const isError = useAppSelector(getIsError);
  const isNotFound = useAppSelector(getIsNotFound);

  if(isError){
    if(isNotFound){
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.NotFound));
    } else {
      dispatch(Action.APP.REDIRECT_TO_ROUTE(AppRoute.Error));
    }
  }

  if(isLoading || isUnknown){
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainScreen />} />
          <Route path={AppRoute.Error} element={<ErrorScreen />} />
          <Route path={AppRoute.NotFound} element={<NotFoundScreen />} />
          <Route path={AppRoute.SignIn} element={<SignInScreen />} />
          <Route path={AppRoute.Film} element={<FilmScreen />} />
          <Route path={AppRoute.Player} element={<PlayerScreen />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <AddRewiewScreen/>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
