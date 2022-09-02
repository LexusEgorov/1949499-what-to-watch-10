import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Action } from '../../store/action';
import Films from '../../types/films';
import classNames from 'classnames';

const GENRES_MAX_COUNT = 10;

type GenresListProps = {
  films: Films;
}

function GenresList({films} : GenresListProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const {currentGenre} = useAppSelector((state) => state);

  const genres : Set<string> = new Set();
  genres.add('All genres');
  films.forEach((film) => genres.add(film.genre));

  return (
    <ul className="catalog__genres-list">
      {
        [...genres].slice(0, GENRES_MAX_COUNT).map((genre) => (
          <li key={genre}
            className={
              classNames('catalog__genres-item', {
                'catalog__genres-item--active': currentGenre === genre
              })
            }
          >
            <a href="/main" className="catalog__genres-link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(Action.GENRE.SET({genre: genre}));
              }}
            >
              {genre}
            </a>
          </li>
        ))
      }
    </ul>
  );
}

export default GenresList;
