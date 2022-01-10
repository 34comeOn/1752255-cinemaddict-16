import { generateMovieData, currentComments } from './mock/task.js';
import { compareCommentsAmount, compareMoviesRating } from './service/util.js';
import { RenderPosition, render } from './service/render.js';
import { renderFilmCard } from './service/render-film-card.js';
import PopupView from './view/popup-view.js';
import ProfileRatingView from './view/profile-view.js';
import MenuView from './view/menu-view.js';
import SortingView from './view/sorting-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import FooterStatisticsView from './view/footer-statistics.js';
import FilmCommentView from './view/comments-view.js';
import FilmsCatalogView from './view/films-catalog-view.js';

const FILMS_PER_STEP = 5;
const MOVIE_DATA_OBJECTS = 20;
const TOP_MOVIES_TO_SHOW = 2;

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticElement = document.querySelector('.footer__statistics');
const footerElement = document.querySelector('.footer');


const movies = Array.from({length: MOVIE_DATA_OBJECTS}, generateMovieData);

const watchlistMovies = movies.filter((movie) => movie.user_details.watchlist === true);
const alreadyWatchedMovies = movies.filter((movie) => movie.user_details.already_watched === true);
const favoriteMovies = movies.filter((movie) => movie.user_details.favorite === true);

const topRatedMovies = movies.slice().sort(compareMoviesRating);
const mostCommentedMovies = movies.slice().sort(compareCommentsAmount);


const profileRatingViewComponent = new ProfileRatingView(alreadyWatchedMovies.length);
render(headerElement, profileRatingViewComponent, RenderPosition.BEFOREEND);

const menuComponent = new MenuView(watchlistMovies, alreadyWatchedMovies, favoriteMovies);
render(mainElement, menuComponent, RenderPosition.AFTERBEGIN);

const filmsCatalogComponent = new FilmsCatalogView();
render(mainElement, filmsCatalogComponent, RenderPosition.BEFOREEND);

const footerStatisticsViewComponent = new FooterStatisticsView(movies);
render(footerStatisticElement, footerStatisticsViewComponent, RenderPosition.AFTERBEGIN);

const sortingViewComponent =  new SortingView();
render(menuComponent, sortingViewComponent, RenderPosition.AFTEREND);

const filmCardsContainerElement = filmsCatalogComponent.element.querySelector('.films-list__container');

bodyElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.closest('.film-card__link')) {
    bodyElement.classList.add('hide-overflow');

    const isCurrentMovie = (movie) => (
      movie.id === Number(evt.target.closest('.film-card__link').querySelector('.film-card__input').value)
    );

    const popupComponent = new PopupView(movies[movies.findIndex(isCurrentMovie)]);
    render(footerElement, popupComponent, RenderPosition.AFTEREND);
    const filmCommentsContainer = document.querySelector('.film-details__comments-list');

    for (let k = 0; k <= currentComments.length - 1; k++) {
      const filmCommentViewComponent = new FilmCommentView(currentComments[k]);
      render(filmCommentsContainer, filmCommentViewComponent, RenderPosition.AFTERBEGIN);
    }

    const closePupupElement = popupComponent.element.querySelector('.film-details__close-btn');

    closePupupElement.addEventListener('click', () => {
      popupComponent.element.remove();

      bodyElement.classList.remove('hide-overflow');
    });
  }
});

for (let i = 0; i < Math.min(FILMS_PER_STEP, MOVIE_DATA_OBJECTS); i++) {
  renderFilmCard(filmCardsContainerElement, movies[i], RenderPosition.BEFOREEND);
}

if (MOVIE_DATA_OBJECTS > FILMS_PER_STEP) {
  let renderedFilmCards = FILMS_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();
  render(filmCardsContainerElement, showMoreButtonComponent, RenderPosition.AFTEREND);

  const showMoreButton = mainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt)=> {
    evt.preventDefault();

    movies
      .slice(renderedFilmCards, renderedFilmCards + FILMS_PER_STEP)
      .forEach((movieCard) => { renderFilmCard(filmCardsContainerElement, movieCard, RenderPosition.BEFOREEND);});

    renderedFilmCards += FILMS_PER_STEP;

    if (renderedFilmCards >= movies.length) {
      showMoreButton.remove();
    }
  });
}

const topRatedContainerElement = mainElement.querySelector('.films-list__container--top_rated');
const mostCommentedContainerElement = mainElement.querySelector('.films-list__container--most_commented');

for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
  renderFilmCard(topRatedContainerElement, topRatedMovies[i], RenderPosition.AFTERBEGIN);
}

for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
  renderFilmCard(mostCommentedContainerElement, mostCommentedMovies[i], RenderPosition.AFTERBEGIN);
}
