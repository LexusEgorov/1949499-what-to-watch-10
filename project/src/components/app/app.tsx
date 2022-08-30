import {Route, Routes} from 'react-router-dom';
import Layout from '../../pages/layout/layout';
import MainScreen from '../../pages/main-screen/main-screen';
import {AppRoute} from '../../const';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddRewiewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks/hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const {isFilmsLoaded, isPromoFilmLoaded} = useAppSelector((state) => state);
  if(isFilmsLoaded || isPromoFilmLoaded){
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainScreen />} />
          <Route path={AppRoute.SignIn} element={<SignInScreen />} />
          <Route path={AppRoute.Film} element={<FilmScreen />} />
          <Route path={AppRoute.Player} element={<PlayerScreen />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute>
                <MyListScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute>
                <AddRewiewScreen/>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path='*' element={<ErrorScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
