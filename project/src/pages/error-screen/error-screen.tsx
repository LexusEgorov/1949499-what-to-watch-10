import { Link } from 'react-router-dom';
import './error.css';

function ErrorScreen() : JSX.Element{
  return (
    <section className="error">
      <p>404 Not Found</p>
      <Link to="/">To the main page</Link>
    </section>
  );
}

export default ErrorScreen;
