import MainScreen from '../../pages/main-screen/main-screen';

type PromoFilm = {
  name: string;
  genre: string;
  date: number;
};

type AppProps = {
  promoFilm : PromoFilm,
  films: number[],
};

function App({promoFilm, films} : AppProps): JSX.Element {
  return <MainScreen promoFilm={promoFilm} films={films} />;
}

export default App;
