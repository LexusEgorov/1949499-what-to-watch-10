import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import Header from '../../components/header/header';
import { DEFAULT_FILTER } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { Action } from '../../store/action';
import { getFilteredFilms } from '../../store/selectors';

type PromoFilm = {
  name: string;
  genre: string;
  date: number;
};

type AppProps = {
  promoFilm : PromoFilm,
};

function MainScreen({promoFilm} : AppProps) : JSX.Element{
  const dispatch = useDispatch();

  const {name, genre, date} = promoFilm;
  const {films} = useAppSelector((state) => state);
  const filteredFilms = useAppSelector(getFilteredFilms);

  useEffect(() => {
    dispatch(Action.GENRE.SET({genre: DEFAULT_FILTER}));
    dispatch(Action.FILM.SET_CURRENT({currentFilm: -1}));
  }, [dispatch]);

  return (
    <section className="main-screen">
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>
        <Header />
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{date}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList films={films}/>
          <FilmsList films={filteredFilms}/>
          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default MainScreen;
