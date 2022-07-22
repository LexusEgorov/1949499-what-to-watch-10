import { Link } from 'react-router-dom';
import Film from '../../types/film';

type CardProps = {
  film: Film;
  setActive: React.Dispatch<React.SetStateAction<Record<never, Film>>>;
};

function Card({film, setActive} : CardProps):JSX.Element{
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => setActive(film)} onMouseLeave={() => setActive({})}>
      <div className="small-film-card__image">
        <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

export default Card;
