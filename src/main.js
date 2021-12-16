import { generateMovieData, currentComments } from './mock/task.js';
import { compareCommentsAmount, compareMoviesRating } from './util.js';
import { RenderPosition, render } from './render.js';
import PopupView from './view/popup-view';
import ProfileRatingView from './view/profile-view';
import MenuView from './view/menu-view';
import FilmCardTemplateView from './view/film-card-view';
import SortingView from './view/sorting-view';
import ShowMoreButtonView from './view/show-more-button-view';
import FooterStatisticsView from './view/footer-statistics';
import FilmCommentView from './view/comments-view';
import FilmsCatalogView from './view/films-catalog-view';

const bodyELement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticElement = document.querySelector('.footer__statistics');
const footerElement = document.querySelector('.footer');

const FILMS_PER_STEP = 5;
const MOVIE_DATA_OBJECTS = 20;
const TOP_MOVIES_TO_SHOW = 2;


const movies = Array.from({length: MOVIE_DATA_OBJECTS}, generateMovieData);

const watchlistMovies = movies.filter((movie) => movie.user_details.watchlist === true);
const alreadyWatchedMovies = movies.filter((movie) => movie.user_details.already_watched === true);
const favoriteMovies = movies.filter((movie) => movie.user_details.favorite === true);

const topRatedMovies = movies.slice().sort(compareMoviesRating);
const mostCommentedMovies = movies.slice().sort(compareCommentsAmount);


render(headerElement, new ProfileRatingView(alreadyWatchedMovies.length).element, RenderPosition.BEFOREEND);

const menuComponent = new MenuView(watchlistMovies, alreadyWatchedMovies, favoriteMovies);
render(mainElement, menuComponent.element, RenderPosition.AFTERBEGIN);

const filmsCatalogComponent = new FilmsCatalogView();
render(mainElement, filmsCatalogComponent.element, RenderPosition.BEFOREEND);
render(footerStatisticElement, new FooterStatisticsView(movies).element, RenderPosition.AFTERBEGIN);
render(menuComponent.element, new SortingView().element, RenderPosition.AFTEREND);

const filmCardsContainerElement = filmsCatalogComponent.element.querySelector('.films-list__container');

bodyELement.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.closest('.film-card__link')) {
    bodyELement.classList.add('hide-overflow');

    const isCurrentMovie = (movie) => (
      movie.id === Number(evt.target.closest('.film-card__link').querySelector('.film-card__input').value)
    );

    const popupComponent = new PopupView(movies[movies.findIndex(isCurrentMovie)]);
    render(footerElement, popupComponent.element, RenderPosition.AFTEREND);
    const filmCommentsContainer = document.querySelector('.film-details__comments-list');

    for (let k = 0; k <= currentComments.length - 1; k++) {
      render(filmCommentsContainer, new FilmCommentView(currentComments[k]).element, RenderPosition.AFTERBEGIN);
    }

    const closePupupElement = popupComponent.element.querySelector('.film-details__close-btn');

    closePupupElement.addEventListener('click', () => {
      popupComponent.element.remove();

      bodyELement.classList.remove('hide-overflow');
    });
  }
});

for (let i = 0; i < Math.min(FILMS_PER_STEP, MOVIE_DATA_OBJECTS); i++) {
  render(filmCardsContainerElement, new FilmCardTemplateView(movies[i]).element, RenderPosition.BEFOREEND);
}

if (MOVIE_DATA_OBJECTS > FILMS_PER_STEP) {
  let renderedFilmCards = FILMS_PER_STEP;

  render(filmCardsContainerElement, new ShowMoreButtonView().element, RenderPosition.AFTEREND);

  const showMoreButton = mainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt)=> {
    evt.preventDefault();

    movies
      .slice(renderedFilmCards, renderedFilmCards + FILMS_PER_STEP)
      .forEach((movieCard) => { render(filmCardsContainerElement, new FilmCardTemplateView(movieCard).element, RenderPosition.BEFOREEND);});

    renderedFilmCards += FILMS_PER_STEP;

    if (renderedFilmCards >= movies.length) {
      showMoreButton.remove();
    }
  });
}

const topRatedContainerElement = mainElement.querySelector('.films-list__container--top_rated');
const mostCommentedContainerElement = mainElement.querySelector('.films-list__container--most_commented');

for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
  render(topRatedContainerElement, new FilmCardTemplateView(topRatedMovies[i]).element, RenderPosition.AFTERBEGIN);
}

for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
  render(mostCommentedContainerElement, new FilmCardTemplateView(mostCommentedMovies[i]).element, RenderPosition.AFTERBEGIN);
}
