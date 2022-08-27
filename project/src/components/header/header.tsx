import { Link } from 'react-router-dom';
import { DEFAULT_FILTER } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { Action } from '../../store/action';

function Header() : JSX.Element {
  const dispatch = useAppDispatch();
  return(
    <>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <div className="logo">
          <Link to='/' className="logo__link"
            onClick={() => {
              dispatch(Action.FILM.SET_CURRENT({currentFilm: -1}));
              dispatch(Action.GENRE.SET({genre: DEFAULT_FILTER}));
            }}
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
