import { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import Film from '../../types/film';
import Films from '../../types/films';
import Card from '../card/card';

type ListProps = {
  films: Films;
  currentFilm: Film | undefined;
  genre: string | undefined;
};


function FilmsList({films, genre, currentFilm} : ListProps) : JSX.Element{
  const currentGenre = useAppSelector((state) => state.currentGenre);
  const [activeCard, setActiveCard] = useState({});
  // eslint-disable-next-line no-console
  console.log(activeCard);

  const filteredFilms = genre === ''
    ? films.filter((film) => (film.genre.toLocaleUpperCase() === currentGenre.toLocaleUpperCase() || currentGenre === 'All genres')).map((film) => (<Card film={film} key={film.id} setActive={setActiveCard}/>))
    : films.filter((film) => (film.genre === genre && film.name !== currentFilm?.name)).slice(0, 4).map((film) => (<Card film={film} key={film.id} setActive={setActiveCard}/>));

  return(
    <div className="catalog__films-list">
      {
        filteredFilms
      }
    </div>
  );
}

export default FilmsList;
