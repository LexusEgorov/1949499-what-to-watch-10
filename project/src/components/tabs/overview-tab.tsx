import { RatingLevel } from '../../const';
import Film from '../../types/film';

const STARRING_COUNT = 4;

type TabProps = {
  currentFilm: Film;
}

const getRatingLevel = (rating : number) : string => {
  if(rating <= RatingLevel.Bad){
    return 'Bad';
  }

  if(rating <= RatingLevel.Normal){
    return 'Normal';
  }

  if(rating <= RatingLevel.Good){
    return 'Good';
  }

  if(rating <= RatingLevel.VeryGood){
    return 'Very good';
  }

  return 'Awesome';
};

function OverviewTab({currentFilm} : TabProps) : JSX.Element {
  const {
    rating,
    scoresCount,
    description,
    director,
    starring,
  } = currentFilm;

  const ratingLevel = getRatingLevel(rating);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating.toFixed(1)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingLevel}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{description}</p>
        <p className="film-card__director"><strong>Director: {director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {starring.slice(0, STARRING_COUNT).join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default OverviewTab;
