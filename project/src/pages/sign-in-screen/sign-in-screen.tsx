import { FormEvent, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

const FIRST_LETTER_EN_CODE_ASCII = 97;
const LAST_LETTER_EN_CODE_ASCII = 122;
const FIRST_LETTER_RU_CODE_ASCII = 1072;
const LAST_LETTER_RU_CODE_ASCII = 1103;
const ZERO_CODE_ASCII = 48;
const NINE_CODE_ASCII = 57;

const checkPassword = (password : string) : boolean => {
  let isFigure = false;
  let isLetter = false;
  const passwordToCheck = password.toLocaleLowerCase();

  for(let i = 0; i < passwordToCheck.length; i++){
    if((passwordToCheck.charCodeAt(i) >= FIRST_LETTER_EN_CODE_ASCII && passwordToCheck.charCodeAt(i) <= LAST_LETTER_EN_CODE_ASCII) ||
       (passwordToCheck.charCodeAt(i) >= FIRST_LETTER_RU_CODE_ASCII && passwordToCheck.charCodeAt(i) <= LAST_LETTER_RU_CODE_ASCII)){
      isLetter = true;
    }

    if(passwordToCheck.charCodeAt(i) >= ZERO_CODE_ASCII && passwordToCheck.charCodeAt(i) <= NINE_CODE_ASCII){
      isFigure = true;
    }

    if(isFigure && isLetter){
      return true;
    }
  }

  return false;
};

function SignInScreen() : JSX.Element{
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isFormValide, setIsFormValide] = useState(true);
  const [isLoginValide, setIsLoginValide] = useState(true);

  const onSubmit = (authData: AuthData) => dispatch(loginAction(authData));

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(loginRef.current !== null && passwordRef.current !== null){
      if(checkPassword(passwordRef.current.value)){
        setIsFormValide(true);
        const response = onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });

        if(response !== null){
          setIsLoginValide(false);
        } else {
          <Navigate to='/' />;
        }
      } else {
        setIsFormValide(false);
      }
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to='/' className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {
            !isFormValide ?
              (
                <div className="sign-in__message">
                  <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
                </div>
              ) : ''
          }
          {
            !isLoginValide ?
              (
                <div className="sign-in__message">
                  <p>Please enter a valid email address</p>
                </div>
              ) : ''
          }
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                ref={loginRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                ref={passwordRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <footer className="page-footer">
        <div className="logo">
          <Link to='/' className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignInScreen;
