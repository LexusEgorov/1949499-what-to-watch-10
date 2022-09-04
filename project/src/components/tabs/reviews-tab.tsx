import { useAppSelector } from '../../hooks/hooks';
import { getCurrentFilmComments } from '../../store/films-data/selectors';
import Comment from '../comment/comment';

function ReviewsTab() : JSX.Element {
  const currentFilmComments = useAppSelector(getCurrentFilmComments);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {currentFilmComments.map((comment) => <Comment commentary={comment} key={comment.id + Date.now()}/>)}
      </div>
    </div>
  );
}

export default ReviewsTab;
