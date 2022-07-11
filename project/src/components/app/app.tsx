import MainScreen from '../../pages/main-screen/main-screen';

type PromoFilm = {
  promoFilmName: string;
  promoFilmGenre: string;
  promoFilmDate: string;
}

function App({promoFilmName, promoFilmGenre, promoFilmDate} : PromoFilm): JSX.Element {
  return <MainScreen promoFilmName={promoFilmName} promoFilmGenre={promoFilmGenre} promoFilmDate={promoFilmDate}/>;
}

export default App;
