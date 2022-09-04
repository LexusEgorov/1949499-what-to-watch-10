import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/selectors';

function Header() : JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  return(
    <>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <div className="logo">
          <Link to='/' className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <ul className="user-block">
          {
            isAuthorized ?
              (
                <Link to={AppRoute.MyList} className="user-block__item">
                  <div className="user-block__avatar">
                    <img src={userData.avatarUrl} alt="User avatar" width="63" height="63" />
                  </div>
                </Link>
              ) : ''
          }
          <li className="user-block__item">
            {
              isAuthorized
                ?
                <a href='/main' className="user-block__link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(logoutAction());
                  }}
                >
                  Sign out
                </a>
                : <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
            }
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
