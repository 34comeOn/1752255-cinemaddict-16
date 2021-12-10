import { createFilmCardTemplate } from './view/film-card-view';
import { createFilmsCatalogTemplate } from './view/films-catalog-view';
import { createFooterStatisticsTemplate } from './view/footer-statistics';
import { createMenuTemplate } from './view/menu-view';
import { createPopupTemplate } from './view/popup-view';
import { createProfileRatingTemplate } from './view/profile-view';
import { createShowMoreButtonTemplate } from './view/show-more-button-view';
import { createSortingTemplate } from './view/sorting-view';
import { createFilmCommentTemplate } from './view/comments-view';
import { generateMovieData, currentComments } from './mock/task.js';
import { compareCommentsAmount, compareMoviesRating } from './util.js';

const FILMS_PER_STEP = 5;
const MOVIE_DATA_OBJECTS = 20;
const TOP_MOVIES_TO_SHOW = 2;

const movies = Array.from({length: MOVIE_DATA_OBJECTS}, generateMovieData);

const watchlistMovies = movies.filter((movie) => movie.user_details.watchlist === true);
const alreadyWatchedMovies = movies.filter((movie) => movie.user_details.already_watched === true);
const favoriteMovies = movies.filter((movie) => movie.user_details.favorite === true);

const topRatedMovies = movies.slice().sort(compareMoviesRating);

const mostCommentedMovies = movies.slice().sort(compareCommentsAmount);

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticElement = document.querySelector('.footer__statistics');
const footerElement = document.querySelector('.footer');

renderTemplate(headerElement, createProfileRatingTemplate(alreadyWatchedMovies.length), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createMenuTemplate(watchlistMovies, alreadyWatchedMovies, favoriteMovies), RenderPosition.AFTERBEGIN);
renderTemplate(mainElement, createFilmsCatalogTemplate(), RenderPosition.BEFOREEND);
renderTemplate(footerStatisticElement, createFooterStatisticsTemplate(movies), RenderPosition.AFTERBEGIN);
renderTemplate(footerElement, createPopupTemplate(movies[0]), RenderPosition.AFTEREND);

const filmCommentsContainer = document.querySelector('.film-details__comments-list');

for (let k = 0; k <= currentComments.length - 1; k++) {
  renderTemplate(filmCommentsContainer, createFilmCommentTemplate(currentComments[k]), RenderPosition.AFTERBEGIN);
}

const menuElement = mainElement.querySelector('.main-navigation');

renderTemplate(menuElement, createSortingTemplate(), RenderPosition.AFTEREND);

const filmCardsContainerElement = mainElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(FILMS_PER_STEP, MOVIE_DATA_OBJECTS); i++) {
  renderTemplate(filmCardsContainerElement, createFilmCardTemplate(movies[i]), RenderPosition.BEFOREEND);
}

if (MOVIE_DATA_OBJECTS > FILMS_PER_STEP) {
  let renderedFilmCards = FILMS_PER_STEP;

  renderTemplate(filmCardsContainerElement, createShowMoreButtonTemplate(), RenderPosition.AFTEREND);

  const showMoreButton = mainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt)=> {
    evt.preventDefault();

    movies
      .slice(renderedFilmCards, renderedFilmCards + FILMS_PER_STEP)
      .forEach((movieCard) => { renderTemplate(filmCardsContainerElement, createFilmCardTemplate(movieCard), RenderPosition.BEFOREEND);});

    renderedFilmCards += FILMS_PER_STEP;

    if (renderedFilmCards >= movies.length) {
      showMoreButton.remove();
    }
  });
}

const topRatedContainerElement = mainElement.querySelector('.films-list__container--top_rated');
const mostCommentedContainerElement = mainElement.querySelector('.films-list__container--most_commented');

for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
  renderTemplate(topRatedContainerElement, createFilmCardTemplate(topRatedMovies[i]), RenderPosition.AFTERBEGIN);
}

for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
  renderTemplate(mostCommentedContainerElement, createFilmCardTemplate(mostCommentedMovies[i]), RenderPosition.AFTERBEGIN);
}
