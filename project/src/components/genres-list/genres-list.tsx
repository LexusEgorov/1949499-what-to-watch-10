import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Films from '../../types/films';
import classNames from 'classnames';
import { getCurrentGenre } from '../../store/genres-data/selectors';
import { setGenre } from '../../store/genres-data/genres-data';

const GENRES_MAX_COUNT = 10;

type GenresListProps = {
  films: Films;
}

function GenresList({films} : GenresListProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(getCurrentGenre);

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
                dispatch(setGenre(genre));
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
