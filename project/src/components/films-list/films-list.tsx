import { useState } from 'react';
import Films from '../../types/films';
import Card from '../card/card';

type ListProps = {
  films: Films;
  genre: string | undefined;
};


function FilmsList({films, genre} : ListProps) : JSX.Element{
  const [activeCard, setActiveCard] = useState({});
  // eslint-disable-next-line no-console
  console.log(activeCard);
  return(
    <div className="catalog__films-list">
      {
        genre === ''
          ? films.map((film) => (<Card film={film} key={film.id} setActive={setActiveCard}/>))
          : films.filter((film) => (film.genre === genre)).slice(0, 4).map((film) => (<Card film={film} key={film.id} setActive={setActiveCard}/>))
      }
    </div>
  );
}

export default FilmsList;
