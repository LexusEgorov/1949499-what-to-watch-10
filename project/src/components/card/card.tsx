import { Link } from 'react-router-dom';
import Film from '../../types/film';
import Videoplayer from '../videoplayer/videoplayer';

type CardProps = {
  film: Film;
};

function Card({film} : CardProps):JSX.Element{
  const {
    videoLink,
    previewImage,
    id,
    name,
  } = film;
  return (
    <article className="small-film-card catalog__films-card">
      <Videoplayer src={videoLink} imgSrc={previewImage}/>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default Card;
