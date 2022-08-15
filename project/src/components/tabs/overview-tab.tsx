import Film from '../../types/film';

type TabProps = {
  currentFilm: Film | undefined;
}

function OverviewTab({currentFilm} : TabProps) : JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{currentFilm?.ratingScore}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{currentFilm?.ratingLevel}</span>
          <span className="film-rating__count">{currentFilm?.ratingCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.</p>
        <p>Gustave prides himself on providing first-class service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.</p>
        <p className="film-card__director"><strong>Director: {currentFilm?.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other</strong></p>
      </div>
    </>
  );
}

export default OverviewTab;
