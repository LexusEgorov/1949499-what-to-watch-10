import { Link } from 'react-router-dom';
import FormComment from '../../components/form-comment/form-comment';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logoutAction } from '../../store/api-actions';

function AddReviewScreen(): JSX.Element {
  const {currentFilm, userData} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const{
    id,
    name,
    backgroundImage,
    backgroundColor,
    posterImage,
  } = currentFilm;

  return (
    <section className="film-card film-card--full"
      style={{
        background: backgroundColor
      }}
    >
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Link to='/' className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <ul className="user-block">
            <Link to={AppRoute.MyList} className="user-block__item">
              <div className="user-block__avatar">
                <img src={userData.avatarUrl} alt="User avatar" width="63" height="63" />
              </div>
            </Link>
            <li className="user-block__item">
              <a className="user-block__link"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(logoutAction());
                }}
              >
                Sign out
              </a>
            </li>
          </ul>
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>
      <FormComment />
    </section>
  );
}

export default AddReviewScreen;
