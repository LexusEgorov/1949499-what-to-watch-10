import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FilmsList from '../../components/films-list/films-list';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeFilmStatus, fetchFilmAction, fetchFilmCommentsAction, fetchSimilarAction } from '../../store/api-actions';
import { getCurrentFilm, getFavoriteFilms, getFilteredFilms } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

function FilmScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const filmId = Number(useParams().id);
  const currentFilm = useAppSelector(getCurrentFilm);

  useEffect(() => {
    if(!currentFilm.id){
      dispatch(fetchFilmAction(filmId));
      dispatch(fetchSimilarAction(filmId));
      dispatch(fetchFilmCommentsAction(filmId));
    }
  }, [currentFilm.id, dispatch, filmId]);

  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const filteredFilms = useAppSelector(getFilteredFilms);

  const {
    name,
    genre,
    released,
    backgroundImage,
    backgroundColor,
    posterImage,
  } = currentFilm;

  if(!currentFilm.id){
    return <LoadingScreen />;
  }

  const changeFilmStatusHandler = () => {
    dispatch(changeFilmStatus({filmId: currentFilm.id, filmStatus: !currentFilm.isFavorite}));
  };

  return (
    <>
      <section className="film-card film-card--full"
        style={{
          background: backgroundColor
        }}
      >
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>
          <Header />
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <Link to={`/player/${currentFilm.id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                {
                  authorizationStatus === AuthorizationStatus.Auth ?
                    (
                      <>
                        <button className="btn btn--list film-card__button" type="button"
                          onClick={changeFilmStatusHandler}
                        >
                          {
                            !currentFilm.isFavorite ?
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
                        <Link to={`/films/${currentFilm.id}/review`} className='btn film-card__button'>Add review</Link>
                      </>
                    ) : ''
                }
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>
            <Tabs currentFilm={currentFilm}/>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={filteredFilms}/>
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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
    </>
  );
}

export default FilmScreen;
