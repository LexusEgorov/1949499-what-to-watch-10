import Films from '../../types/films';
import Card from '../card/card';

type FilmsListProps = {
  films: Films;
}

function FilmsList({films} : FilmsListProps) : JSX.Element{
  const filteredFilms = films.map((film) => <Card film={film} key={film.id}/>);

  return(
    <div className="catalog__films-list">
      {
        filteredFilms
      }
    </div>
  );
}

export default FilmsList;
