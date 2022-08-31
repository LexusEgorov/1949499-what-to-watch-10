import { useState } from 'react';
import { FilmTabs } from '../../const';
import Film from '../../types/film';
import DetailsTab from './details-tab';
import OverviewTab from './overview-tab';
import ReviewsTab from './reviews-tab';

type TabsProps = {
  currentFilm: Film;
};

function Tabs ({currentFilm} : TabsProps) : JSX.Element {
  const [currentTab, setCurrentTab] = useState(FilmTabs.Overview);

  let renderedTab : JSX.Element = <OverviewTab currentFilm={currentFilm}/>;

  switch (currentTab) {
    case FilmTabs.Details:
      renderedTab = <DetailsTab currentFilm={currentFilm}/>;
      break;
    case FilmTabs.Reviews:
      renderedTab = <ReviewsTab/>;
      break;
    default:
      renderedTab = <OverviewTab currentFilm={currentFilm}/>;
      break;
  }

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${currentTab === FilmTabs.Overview ? 'film-nav__item--active' : ''}`}>
            <a href="#" className="film-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                setCurrentTab(FilmTabs.Overview);
              }}
            >
              Overview
            </a>
          </li>
          <li className={`film-nav__item ${currentTab === FilmTabs.Details ? 'film-nav__item--active' : ''}`}>
            <a href="#" className="film-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                setCurrentTab(FilmTabs.Details);
              }}
            >
              Details
            </a>
          </li>
          <li className={`film-nav__item ${currentTab === FilmTabs.Reviews ? 'film-nav__item--active' : ''}`}>
            <a href="#" className="film-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                setCurrentTab(FilmTabs.Reviews);
              }}
            >
              Reviews
            </a>
          </li>
        </ul>
      </nav>
      {renderedTab}
    </div>
  );
}

export default Tabs;
