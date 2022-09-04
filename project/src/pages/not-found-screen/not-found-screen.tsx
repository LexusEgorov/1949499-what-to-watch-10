import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './error.css';

function NotFoundScreen() : JSX.Element{
  return (
    <section className="error">
      <p>404 Page not found</p>
      <Link to={AppRoute.Root}>To the main page</Link>
    </section>
  );
}

export default NotFoundScreen;
