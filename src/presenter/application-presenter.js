import { compareCommentsAmount, compareMoviesRating, getRandomInteger } from '../service/util.js';
import { RenderPosition, render } from '../service/render.js';
import PopupView from '../view/popup-view.js';
import ProfileRatingView from '../view/profile-view.js';
import MenuView from '../view/menu-view.js';
import SortingView from '../view/sorting-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FooterStatisticsView from '../view/footer-statistics.js';
import FilmCommentView from '../view/comments-view.js';
import FilmsCatalogView from '../view/films-catalog-view.js';
import FilmCardView from '../view/film-card-view.js';

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

  #profileRatingComponent = null;
  #menuComponent = null;
  #filmsCatalogComponent = new FilmsCatalogView();
  #footerStatisticsComponent = null;
  #sortingComponent = new SortingView();
  #popupComponent = null;
  #filmCommentComponent = null;
  #moreMoviesButton = new ShowMoreButtonView();

  #renderedFilmCards = FILMS_PER_STEP;


  #movies = [];
  #alreadyRenderedFilms = new Map();

  constructor(headerContainer, mainContainer, footerContainer, footerStatisticContainer) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#footerStatisticContainer = footerStatisticContainer;
  }

  init = (movies) => {
      this.#movies = [...movies];
      this.#renderProfileRating(this.#movies);
      this.#renderMenu(this.#movies);
      this.#renderSorting();
      this.#renderCatalog();
      this.#renderFilmsToCatalog();
      this.#renderFilmsToTopRated(this.#movies);
      this.#renderFilmsToMostCommented(this.#movies);
      this.#renderFooterStatistics(this.#movies);
  }



  #getWatchedMovies = (moviesDataArray) => {
    return moviesDataArray.filter((movie) => movie.user_details.already_watched === true).length;
  }

  #getWishListMovies = (moviesDataArray) => {
    return moviesDataArray.filter((movie) => movie.user_details.watchlist === true).length;
  }

  #getFavoriteMovies = (moviesDataArray) => {
    return moviesDataArray.filter((movie) => movie.user_details.watchlist === true).length;
  }

  #sliceMoviesForTopRated = (moviesDataArray) => {
    return moviesDataArray.slice().sort(compareMoviesRating);
  }

  #sliceMoviesForMostCommented = () => {
    return this.#movies.slice().sort(compareCommentsAmount);
  }

  #renderProfileRating = (moviesDataArray) => {
    this.#profileRatingComponent = new ProfileRatingView(this.#getWatchedMovies(moviesDataArray));
    render(this.#headerContainer, this.#profileRatingComponent, RenderPosition.BEFOREEND);
  }

  #renderMenu = (moviesDataArray) => {
    this.#menuComponent = new MenuView(this.#getWishListMovies(moviesDataArray), this.#getWatchedMovies(moviesDataArray), this.#getFavoriteMovies(moviesDataArray));

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

    this.#alreadyRenderedFilms.set(moviesData.id, filmCardComponent);

    filmCardComponent.setEditClickHandler(this.#renderPopup);
    filmCardComponent.setEditClickHandlerAddToButtons(this.#addFilmTo);
  }

  #renderFilmsToCatalog = () => {
    this.#catalogContainer = this.#filmsCatalogComponent.element.querySelector('.films-list__container');

    for (let i = 0; i < Math.min(FILMS_PER_STEP, MOVIE_DATA_OBJECTS); i++) {
      this.#renderFilmCard(this.#catalogContainer, this.#movies[i], RenderPosition.BEFOREEND);
    }

    if (MOVIE_DATA_OBJECTS > FILMS_PER_STEP) {
      render(this.#catalogContainer, this.#moreMoviesButton, RenderPosition.AFTEREND);

      this.#moreMoviesButton.setEditClickHandler(this.#renderMoreFilmsByClick);
    }
  }

  #renderMoreFilmsByClick = () => {
    this.#movies
    .slice(this.#renderedFilmCards, this.#renderedFilmCards + FILMS_PER_STEP)
    .forEach((movieCard) => { this.#renderFilmCard(this.#catalogContainer, movieCard, RenderPosition.BEFOREEND);});

    this.#renderedFilmCards += FILMS_PER_STEP;

    if (this.#renderedFilmCards >= this.#movies.length) {
      this.#moreMoviesButton.element.remove();
    }
  }

  #renderFilmsToTopRated = (moviesData) => {
    this.#topRatedContainer = this.#mainContainer.querySelector('.films-list__container--top_rated');

    for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
      this.#renderFilmCard(this.#topRatedContainer, this.#sliceMoviesForTopRated(moviesData)[i], RenderPosition.AFTERBEGIN);
    }
  }

  #renderFilmsToMostCommented = (moviesData) => {
    this.#mostCommentedContainer = this.#mainContainer.querySelector('.films-list__container--most_commented');

    for (let i = 0; i < TOP_MOVIES_TO_SHOW; i++) {
      this.#renderFilmCard(this.#mostCommentedContainer, this.#sliceMoviesForMostCommented(moviesData)[i], RenderPosition.AFTERBEGIN);
    }
  }

  #renderFooterStatistics = (moviesData) => {
    this.#footerStatisticsComponent = new FooterStatisticsView(moviesData);

    render(this.#footerStatisticContainer, this.#footerStatisticsComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPopup = (currentMovieIndex) => {
    bodyElement.classList.add('hide-overflow');

    this.#popupComponent = new PopupView(this.#movies[this.#movies.findIndex(currentMovieIndex)]);
    render(this.#footerContainer, this.#popupComponent, RenderPosition.AFTEREND);

    this.#renderFilmComments(currentMovieIndex);

    this.#popupComponent.setEditClickHandler(this.#closePopup);
  }

  #closePopup = () => {
    this.#popupComponent.element.remove();

    bodyElement.classList.remove('hide-overflow');
  }

  #renderFilmComments = (currentMovieIndex) => {
    const filmCommentsContainer = this.#popupComponent.element.querySelector('.film-details__comments-list');

    const currentComments = this.#movies[this.#movies.findIndex(currentMovieIndex)].comments;

    for (const comment of currentComments) {
      this.#filmCommentComponent = new FilmCommentView(comment);
      render(filmCommentsContainer, this.#filmCommentComponent, RenderPosition.AFTERBEGIN);
    }
  }

  #addFilmTo = () => {
    console.log('ura');
  }
}

