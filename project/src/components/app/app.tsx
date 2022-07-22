import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import Films from '../../types/films';

type PromoFilm = {
  name: string;
  genre: string;
  date: number;
};

type AppProps = {
  promoFilm : PromoFilm,
  films: Films,
};

function App({promoFilm, films} : AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainScreen promoFilm={promoFilm} films={films}/>} />
          <Route path={AppRoute.SignIn} element={<SignInScreen />} />
          <Route path={AppRoute.Film} element={<FilmScreen films={films}/>} />
          <Route path={AppRoute.Player} element={<PlayerScreen films={films}/>} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <MyListScreen films={films}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <AddRewiewScreen films={films}/>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path='*' element={<ErrorScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
