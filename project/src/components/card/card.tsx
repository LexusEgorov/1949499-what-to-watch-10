import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { Action } from '../../store/action';
import Film from '../../types/film';
import Videoplayer from '../videoplayer/videoplayer';

type CardProps = {
  film: Film;
};

function Card({film} : CardProps):JSX.Element{
  const dispatch = useAppDispatch();
  return (
    <article className="small-film-card catalog__films-card">
      <Videoplayer src={film.videoSrc} imgSrc='img/snatch.jpg'/>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link"
          onClick={() => {
            dispatch(Action.FILM.SET_CURRENT({currentFilm: film.id}));
          }}
        >
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default Card;
