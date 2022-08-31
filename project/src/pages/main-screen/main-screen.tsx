import { useEffect, useState } from 'react';
import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import Header from '../../components/header/header';
import { AuthorizationStatus, DEFAULT_FILTER, FILMS_BLOCK } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Action } from '../../store/action';
import { changeFilmStatus } from '../../store/api-actions';
import { getFilteredFilms } from '../../store/selectors';
import Film from '../../types/film';

function MainScreen() : JSX.Element{
  const dispatch = useAppDispatch();

  const changeFilmStatusHandler = () => {
    dispatch(changeFilmStatus({filmId: promoFilm.id, filmStatus: !promoFilm.isFavorite}));
  };


  const [countFilms, setCountFilms] = useState(FILMS_BLOCK);

  const {promoFilm, films, favoriteFilms, authorizationStatus} = useAppSelector((state) => state);

  const {
    posterImage,
    name,
    backgroundImage,
    genre,
    released,
  } = promoFilm;

  const filteredFilms = useAppSelector(getFilteredFilms);
  const slicedFilteredFilms = filteredFilms.slice(0, countFilms);

  const [isMoreFilms, setIsMoreFilms] = useState(slicedFilteredFilms.length < filteredFilms.length);

  useEffect(() => {
    dispatch(Action.GENRE.SET({genre: DEFAULT_FILTER}));
    dispatch(Action.FILMS.SET_CURRENT({currentFilm: {} as Film}));
    dispatch(Action.FILMS.SET_CURRENT_COMMENTS({currentFilmComments: []}));
  }, [dispatch]);

  useEffect(() => {
    setCountFilms(FILMS_BLOCK);
    setIsMoreFilms(FILMS_BLOCK < filteredFilms.length);
  }, [filteredFilms]);

  return (
    <section className="main-screen">
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>
        <Header />
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  authorizationStatus === AuthorizationStatus.Auth ?
                    (
                      <button className="btn btn--list film-card__button" type="button"
                        onClick={changeFilmStatusHandler}
                      >
                        {
                          !promoFilm.isFavorite ?
                            (
                              <>
                                <svg viewBox="0 0 19 20" width="19" height="20">
                                  <use xlinkHref="#add"></use>
                                </svg>
                                <span>My list</span>
                              </>
                            ) :
                            (
                              <span>✓ My list</span>
                            )
                        }
                        <span className="film-card__count">{favoriteFilms.length}</span>
                      </button>
                    ) : ''
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList films={films}/>
          <FilmsList films={slicedFilteredFilms}/>
          {
            isMoreFilms ?
              (
                <div className="catalog__more">
                  <button className="catalog__button" type="button"
                    onClick={() => {
                      setCountFilms(countFilms + FILMS_BLOCK);
                      if(countFilms + FILMS_BLOCK >= filteredFilms.length){
                        setIsMoreFilms(false);
                      }
                    }}
                  >
                    Show more
                  </button>
                </div>
              ) : ''
          }
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
