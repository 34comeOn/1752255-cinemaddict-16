import { compareCommentsAmount, compareMoviesRating } from './service/util.js';
import { RenderPosition, render } from './service/render.js';
import PopupView from './view/popup-view.js';
import ProfileRatingView from './view/profile-view.js';
import MenuView from './view/menu-view.js';
import SortingView from './view/sorting-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import FooterStatisticsView from './view/footer-statistics.js';
import FilmCommentView from './view/comments-view.js';
import FilmsCatalogView from './view/films-catalog-view.js';
import FilmCardView from './view/film-card-view.js';

const FILMS_PER_STEP = 5;
const MOVIE_DATA_OBJECTS = 20;
const TOP_MOVIES_TO_SHOW = 2;

const bodyElement = document.querySelector('body');

export default class ApplicationPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #catalogContainer = null;
  #topRatedContainer = null;
  #mostCommentedContainer = null;
  #footerContainer = null;
  #footerStatisticContainer = null;

  #profileRatingComponent = new ProfileRatingView(this.#getWatchedMovies());
  #menuComponent = new MenuView(this.#getWishListMovies(), this.#getWatchedMovies(), this.#getFavoriteMovies());
  #filmsCatalogComponent = new FilmsCatalogView();
  #footerStatisticsComponent = new FooterStatisticsView();
  #sortingComponent = new SortingView();
  #popupComponent = null;
  #filmCommentComponent = null;
  #moreMoviesButton = new ShowMoreButtonView();

  #movies = [];

  constructor(headerContainer, mainContainer, footerContainer, footerStatisticContainer) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#footerStatisticContainer = footerStatisticContainer;
  }

  init = (movies) => {
      this.#movies = [...movies];

      this.#renderProfileRating();
      this.#renderMenu();
      this.#renderSorting();
      this.#renderCatalog();
      this.#renderFilmsToCatalog();
      this.#renderFilmsToTopRated();
      this.#renderFilmsToMostCommented();
      this.#renderFooterStatistics();
  }

  #getWatchedMovies = () => {
    return this.#movies.filter((movie) => movie.user_details.already_watched === true).length;
  }

  #getWishListMovies = () => {
    return this.#movies.filter((movie) => movie.user_details.watchlist === true).length;
  }

  #getFavoriteMovies = () => {
    return this.#movies.filter((movie) => movie.user_details.watchlist === true).length;
  }

  #sliceMoviesForTopRated = () => {
    return this.#movies.slice().sort(compareMoviesRating);
  }

  #sliceMoviesForMostCommented = () => {
    return this.#movies.slice().sort(compareCommentsAmount);
  }

  #renderProfileRating = () => {
    render(this.#headerContainer, this.#profileRatingComponent, RenderPosition.BEFOREEND);
  }

  #renderMenu = () => {
    render(this.#mainContainer, this.#menuComponent, RenderPosition.AFTERBEGIN);
  }

  #renderSorting = () => {
    render(this.#menuComponent, this.#sortingComponent, RenderPosition.AFTEREND);
  }

  #renderCatalog = () => {
    render(this.#mainContainer, this.#filmsCatalogComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmCard = (container, moviesData, place) => {
    const filmCardComponent = new FilmCardView(moviesData);

    render(container, filmCardComponent, place);

    filmCardComponent.setEditClickHandler(this.#renderPopup);
  }

  #renderFilmsToCatalog = () => {
    this.#catalogContainer = this.#filmsCatalogComponent.element.querySelector('.films-list__container');

    for (let i = 0; i < Math.min(FILMS_PER_STEP, MOVIE_DATA_OBJECTS); i++) {
      this.#renderFilmCard(this.#catalogContainer, this.#movies[i], RenderPosition.BEFOREEND);
    }

    if (MOVIE_DATA_OBJECTS > FILMS_PER_STEP) {
      let renderedFilmCards = FILMS_PER_STEP;

      render(this.#catalogContainer, this.#moreMoviesButton, RenderPosition.AFTEREND);

      const showMoreButton = this.#mainContainer.querySelector('.films-list__show-more');

      showMoreButton.addEventListener('click', (evt)=> {
        evt.preventDefault();

        this.#movies
          .slice(renderedFilmCards, renderedFilmCards + FILMS_PER_STEP)
          .forEach((movieCard) => { this.#renderFilmCard(this.#catalogContainer, movieCard, RenderPosition.BEFOREEND);});

        renderedFilmCards += FILMS_PER_STEP;

        if (renderedFilmCards >= this.#movies.length) {
          showMoreButton.remove();
        }
      });
    }
  }

  #renderFilmsToTopRated = () => {
    this.#topRatedContainer = this.#mainContainer.querySelector('.films-list__container--top_rated');

    for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
      this.#renderFilmCard(this.#topRatedContainer, this.#sliceMoviesForTopRated[i], RenderPosition.AFTERBEGIN);
    }
  }

  #renderFilmsToMostCommented = () => {
    this.#mostCommentedContainer = this.#mainContainer.querySelector('.films-list__container--most_commented');

    for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
      this.#renderFilmCard(this.#mostCommentedContainer, this.#sliceMoviesForMostCommented[i], RenderPosition.AFTERBEGIN);
    }
  }

  #renderFooterStatistics = () => {
    render(this.#footerStatisticContainer, this.#footerStatisticsComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPopup = (currentMovieIndex) => {
    bodyElement.classList.add('hide-overflow');

    this.#popupComponent = new PopupView(this.#movies[this.#movies.findIndex(currentMovieIndex)]);
    render(this.#footerContainer, this.#popupComponent, RenderPosition.AFTEREND);

    this.#renderFilmComments();

    this.#popupComponent.setEditClickHandler(this.#closePopup);
  }

  #closePopup = () => {
    this.#popupComponent.element.remove();

    bodyElement.classList.remove('hide-overflow');
  }

  #renderFilmComments = () => {
    const filmCommentsContainer = this.#popupComponent.element.querySelector('.film-details__comments-list');

    const currentComments = this.#movies[this.#movies.findIndex(currentMovieIndex)].comments;

    for (const comment of currentComments) {
      this.#filmCommentComponent = new FilmCommentView(comment);
      render(filmCommentsContainer, this.#filmCommentComponent, RenderPosition.AFTERBEGIN);
    }
  }
}
