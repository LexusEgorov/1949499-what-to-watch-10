import { Link } from 'react-router-dom';
import Film from '../../types/film';
import Videoplayer from '../videoplayer/videoplayer';

type CardProps = {
  film: Film;
  setActive: React.Dispatch<React.SetStateAction<Record<never, Film>>>;
};

function Card({film, setActive} : CardProps):JSX.Element{
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => setActive(film)} onMouseLeave={() => setActive({})}>
      <Videoplayer src={film.videoSrc} imgSrc='img/snatch.jpg'/>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

export default Card;
